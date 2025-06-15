import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/api';
import { blog_data } from '../assets/assets';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({ 
    name: '', 
    email: '',
    content: '' 
  });

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        // First try to get from API
        const response = await api.getBlogById(id);
        if (response.success) {
          setBlog(response.blog);
        } else {
          // If API fails, try to get from static data
          const staticBlog = blog_data.find(blog => blog.use === id);
          if (staticBlog) {
            setBlog(staticBlog);
          } else {
            setError('Blog not found');
          }
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        // If API call fails, try to get from static data
        const staticBlog = blog_data.find(blog => blog.use === id);
        if (staticBlog) {
          setBlog(staticBlog);
        } else {
          setError('Blog not found');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
      if (!newComment.name.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await api.addComment({
        blogId: id,
        ...newComment
      });

      if (response.success) {
        // Clear form
        setNewComment({ name: '', email: '', content: '' });
        setError(null);
        // Show success message
        alert('Comment submitted successfully! It will be visible after approval.');
      } else {
        setError(response.error || 'Failed to add comment');
      }
    } catch (error) {
      setError('Error adding comment');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-600">{error}</div>
    </div>;
  }

  if (!blog) {      return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl text-gray-700">Blog not found or is not currently available</div>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
        {blog.subTitle && (
          <h2 className="text-xl text-gray-600 mt-2">{blog.subTitle}</h2>
        )}        <div className="mt-4">
          <img src={blog.image} alt={blog.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="mt-4 text-gray-600">{blog.description}</div>
        <div className="mt-8 text-gray-800 whitespace-pre-line">{blog.content}</div>
      </article>

      {/* Comments section */}
      <section className="mt-16">
        <h3 className="text-2xl font-semibold">Comments</h3>
        
        {/* Comment form */}
        <form onSubmit={handleAddComment} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={newComment.name}
              onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={newComment.email}
              onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea
              id="content"
              value={newComment.content}
              onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Comment
          </button>
        </form>

        {/* Comments list */}
        <div className="mt-8 space-y-6">
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{comment.name}</h4>
                  <time className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="mt-2 text-gray-700">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
