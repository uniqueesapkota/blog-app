import React from 'react';

const BlogTableItem = ({ blog }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{blog.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{blog.date}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
          blog.status === "Published" 
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {blog.status}
        </span>
      </td>
    </tr>
  );
};

export default BlogTableItem;
