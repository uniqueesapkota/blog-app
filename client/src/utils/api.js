// API Base URL and Default Headers
const API_BASE_URL = 'http://localhost:5000/api';
const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

// Error Handler
const handleApiError = (error) => {
    console.error('API Error:', error);
    if (error.response) {
        throw new Error(error.response.data.message || 'Server Error');
    }
    throw error;
};

// Response Handler
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'API Error');
    }
    return data;
};

// Auth Header Helper
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {    // Auth Endpoints
    login: async (credentials) => {
        try {
            console.log('Attempting login with:', credentials.email);
            const response = await fetch(`${API_BASE_URL}/admin/login`, {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify(credentials)
            });
            const data = await handleResponse(response);
            if (data.success && data.token) {
                localStorage.setItem('token', data.token);
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken);
                }
            }
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },    verifyToken: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(`${API_BASE_URL}/admin/verify-token`, {
                method: 'GET',
                headers: {
                    ...defaultHeaders,
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await handleResponse(response);
            return data;
        } catch (error) {
            console.error('Token verification error:', error);
            // Clear auth data on verification failure
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('isAdmin');
            throw error;
        }
    },

    // Blog CRUD Operations
    createBlog: async (blogData) => {
        try {
            const formData = new FormData();
            const blogInfo = {
                title: blogData.title,
                subTitle: blogData.subTitle,
                description: blogData.description,
                category: blogData.category,
                isPublished: blogData.isPublished || false
            };

            // Append blog data
            Object.keys(blogInfo).forEach(key => {
                formData.append(key, blogInfo[key]);
            });

            // Append image if exists
            if (blogData.image) {
                formData.append('image', blogData.image);
            }

            const response = await fetch(`${API_BASE_URL}/blogs`, {
                method: 'POST',
                headers: { ...getAuthHeader() },
                body: formData
            });
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    updateBlog: async (id, blogData) => {
        try {
            const formData = new FormData();
            const blogInfo = {
                title: blogData.title,
                subTitle: blogData.subTitle,
                description: blogData.description,
                category: blogData.category,
                isPublished: blogData.isPublished
            };

            // Append blog data
            Object.keys(blogInfo).forEach(key => {
                formData.append(key, blogInfo[key]);
            });

            // Append image if exists
            if (blogData.image) {
                formData.append('image', blogData.image);
            }

            const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
                method: 'PUT',
                headers: { ...getAuthHeader() },
                body: formData
            });
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    deleteBlog: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
                method: 'DELETE',
                headers: { ...defaultHeaders, ...getAuthHeader() }
            });
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    // Blog Listing and Details
    getAllBlogs: async () => {
        try {
            console.log('Fetching blogs from server...');
            const response = await fetch(`${API_BASE_URL}/blog/list`, {
                method: 'GET',
                headers: defaultHeaders
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Server response:', data);
            
            if (!data.success) {
                throw new Error(data.message || 'Failed to fetch blogs');
            }
            
            return data;
        } catch (error) {
            console.error('getAllBlogs error:', error);
            throw error;
        }
    },

    getBlogById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    getAllBlogsAdmin: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/blogs`, {
                method: 'GET',
                headers: { ...defaultHeaders, ...getAuthHeader() }
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error fetching admin blogs:', error);
            throw error;
        }
    },

    // Blog Status Management
    updateBlogStatus: async (id, isPublished) => {
        try {
            const endpoint = isPublished ? 'publish' : 'unpublish';
            const response = await fetch(`${API_BASE_URL}/blogs/${id}/${endpoint}`, {
                method: 'PUT',
                headers: { ...defaultHeaders, ...getAuthHeader() }
            });
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    // Comment CRUD Operations
    addComment: async (blogId, commentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments`, {
                method: 'POST',
                headers: { 
                    ...defaultHeaders,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            });
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    getAllComments: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/comments`, {
                headers: { ...defaultHeaders, ...getAuthHeader() }
            });
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    getBlogComments: async (blogId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments`);
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    approveComment: async (blogId, commentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments/${commentId}/approve`, {
                method: 'PUT',
                headers: { ...defaultHeaders, ...getAuthHeader() }
            });
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    deleteComment: async (blogId, commentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${blogId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: { ...defaultHeaders, ...getAuthHeader() }
            });
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    // Dashboard Data
    getDashboardStats: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
                headers: { ...defaultHeaders, ...getAuthHeader() }
            });
            return handleResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    },

    getDashboardData: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
                method: 'GET',
                headers: { ...defaultHeaders, ...getAuthHeader() }
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Dashboard data error:', error);
            throw error;
        }
    }
};
