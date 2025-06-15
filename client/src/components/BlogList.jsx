import React, { useState } from 'react';
import { blogCategories, blog_data } from '../assets/assets';
import BlogCard from './BlogCard';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // No need to fetch - using static data directly
  // Filter blogs by category and search query
  const filteredBlogs = blog_data.filter((blog) => {
    const matchesCategory = menu === 'All' || blog.category === menu;
    const matchesSearch = !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div>
      {/* Top search bar */}
      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Category buttons */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative overflow-x-auto px-4'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              className={`relative px-6 py-2 rounded-full bg-white text-gray-700 hover:text-indigo-600 focus:outline-none ${menu === item ? 'font-bold underline' : ''}`}
              onClick={() => setMenu(item)}
            >
              {item}
            </button>
          </div>
        ))}
      </div>      {/* Blog grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.use} blog={blog} />)
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No blogs found. {searchQuery ? 'Try a different search term.' : ''}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList
