// Default headers for all requests
const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Fetch wrapper that handles token refresh
const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token available');
    }

    // Add token to headers
    const fetchOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(url, fetchOptions);
    return response;
};

// API Object with all the endpoints
const api = {
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || data.message || 'Login failed');
        }
        return data;
    },

    getDashboardData: async () => {
        const response = await fetchWithAuth(`${API_BASE_URL}/admin/dashboard`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch dashboard data');
        }
        return data;
    },

    updateBlogStatus: async (blogId, isPublished) => {
        const response = await fetchWithAuth(`${API_BASE_URL}/admin/blog/update-status/${blogId}`, {
            method: 'PUT',
            body: JSON.stringify({ isPublished })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update blog status');
        }
        return data;
    },

    addBlog: async (formData) => {
        const response = await fetchWithAuth(`${API_BASE_URL}/blog/add`, {
            method: 'POST',
            body: formData
        });
        return response.json();
    },

    updateBlog: async (id, formData) => {
        const response = await fetchWithAuth(`${API_BASE_URL}/blog/admin/update/${id}`, {
            method: 'PUT',
            body: formData
        });
        return response.json();
    },

    deleteBlog: async (id) => {
        const response = await fetchWithAuth(`${API_BASE_URL}/blog/admin/delete/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    getBlogs: async () => {
        const response = await fetch(`${API_BASE_URL}/blog/list`);
        return response.json();
    },

    getBlogById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/blog/details/${id}`);
        return response.json();
    },

    addComment: async (data) => {
        const response = await fetch(`${API_BASE_URL}/blog/comment`, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(data)
        });
        return response.json();
    },

    getAllComments: async () => {
        const response = await fetchWithAuth(`${API_BASE_URL}/blog/admin/comments`);
        return response.json();
    },

    approveComment: async (id) => {
        const response = await fetchWithAuth(`${API_BASE_URL}/blog/admin/comments/approve/${id}`, {
            method: 'PUT'
        });
        return response.json();
    },

    deleteComment: async (id) => {
        const response = await fetchWithAuth(`${API_BASE_URL}/blog/admin/comments/delete/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    verifyToken: async () => {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/admin/verify-token`);
            return response.json();
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
};

export { api, fetchWithAuth };
