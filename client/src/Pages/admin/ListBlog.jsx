import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { assets } from '../../assets/assets';

const ListBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await api.getAllBlogsAdmin();
            if (response.success) {
                setBlogs(response.blogs);
            } else {
                setError(response.error || 'Failed to fetch blogs');
            }
        } catch (error) {
            setError('Error fetching blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (blogId, newStatus) => {
        try {
            const response = await api.updateBlogStatus(blogId, newStatus);
            if (response.success) {
                setBlogs(blogs.map(blog => 
                    blog._id === blogId 
                        ? { ...blog, isPublished: newStatus } 
                        : blog
                ));
            }
        } catch (error) {
            console.error('Error updating blog status:', error);
        }
    };

    const handleDelete = async (blogId) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        try {
            const response = await api.deleteBlog(blogId);
            if (response.success) {
                setBlogs(blogs.filter(blog => blog._id !== blogId));
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    // Filter blogs based on search term and status
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' 
            ? true 
            : filterStatus === 'published' ? blog.isPublished : !blog.isPublished;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center py-8">
                {error}
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">Blogs</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all blogs including their title, status, and actions.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                        to="/admin/addBlog"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add Blog
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
            </div>

            {/* Blog List */}
            <div className="mt-8 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                                            Title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Date
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Comments
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredBlogs.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-4 text-center text-sm text-gray-500">
                                                No blogs found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredBlogs.map((blog) => (
                                            <tr key={blog._id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                    {blog.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                        blog.isPublished
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {blog.isPublished ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {new Date(blog.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {blog.comments?.length || 0}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            onClick={() => handleStatusChange(blog._id, !blog.isPublished)}
                                                            className={`${
                                                                blog.isPublished
                                                                    ? 'text-yellow-600 hover:text-yellow-900'
                                                                    : 'text-green-600 hover:text-green-900'
                                                            }`}
                                                        >
                                                            {blog.isPublished ? 'Unpublish' : 'Publish'}
                                                        </button>
                                                        <Link
                                                            to={`/admin/editBlog/${blog._id}`}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(blog._id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListBlog;
