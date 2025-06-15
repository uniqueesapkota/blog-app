import React from 'react';
import { assets } from '../../../src/assets/assets';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/sidebar';

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear all auth tokens
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isAdmin');
    // Navigate to login page
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className='flex justify-between items-center bg-white p-4 shadow-md'>
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 sm:w-40 cursor-pointer"
          onClick={() => navigate('/admin')}
        />
        <button
          onClick={logout}
          className="text-sm px-8 py-2 bg-indigo-600 text-white rounded-full cursor-pointer hover:bg-indigo-700 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
      <div className='flex min-h-[calc(100vh-70px)]'>
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
