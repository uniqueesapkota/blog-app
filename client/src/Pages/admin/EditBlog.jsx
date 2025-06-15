import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    category: '',
    isPublished: false,
    thumbnail: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogById(id).then(res => {
      if (res.success) {
        setFormData({
          title: res.blog.title,
          subTitle: res.blog.subTitle,
          description: res.blog.description,
          category: res.blog.category,
          isPublished: res.blog.isPublished,
          thumbnail: null
        });
      } else {
        setError(res.error || res.message);
      }
      setLoading(false);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formDataToSend = new FormData();
    formDataToSend.append('blog', JSON.stringify({
      title: formData.title,
      subTitle: formData.subTitle,
      description: formData.description,
      category: formData.category,
      isPublished: formData.isPublished
    }));
    if (formData.thumbnail) {
      formDataToSend.append('image', formData.thumbnail);
    }
    const res = await api.updateBlog(id, formDataToSend);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.error || res.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="subTitle" value={formData.subTitle} onChange={handleInputChange} placeholder="Subtitle" className="w-full p-2 border rounded" />
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full p-2 border rounded" rows={5} required />
        <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" className="w-full p-2 border rounded" required />
        <label className="block">
          <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} /> Published
        </label>
        <input type="file" accept="image/*" onChange={handleThumbnailUpload} />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
