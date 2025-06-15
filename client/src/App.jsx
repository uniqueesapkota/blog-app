import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Blog from './Pages/Blog';
import Layout from './Pages/admin/layout';
import Dashboard from './Pages/admin/Dashboard';
import AddBlog from './Pages/admin/AddBlog';
import ListBlog from './Pages/admin/ListBlog';
import Comments from './Pages/admin/Comments';
import Login from './components/admin/Login';
import AdminRoute from './components/admin/AdminRoute';
import EditBlog from './Pages/admin/EditBlog';

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected admin routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <Layout />
          </AdminRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="editBlog/:id" element={<EditBlog />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
