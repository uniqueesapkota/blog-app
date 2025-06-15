import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isAdmin');
        navigate('/');
    };

    const handleAdminAction = () => {
        if (isAdmin && token) {
            navigate('admin');
        } else {
            navigate('/admin/login');
        }
    };

    return (
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
            <img 
                onClick={() => navigate('/')} 
                src={assets.logo} 
                alt="logo" 
                className='w-32 sm:w-44 cursor-pointer'
            />
            {isAdmin && token ? (
                <div className="flex gap-4">
                    <button
                        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-indigo-600 text-white px-10 py-2.5 shadow-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95'
                        onClick={() => navigate('/admin')}
                    >
                        Dashboard
                        <img src={assets.arrow} alt='arrow' className='w-3' />
                    </button>
                    <button
                        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-red-600 text-white px-10 py-2.5 shadow-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button
                    className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-indigo-600 text-white px-10 py-2.5 shadow-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95'
                    onClick={handleAdminAction}
                >
                    Login
                    <img src={assets.arrow} alt='arrow' className='w-3' />
                </button>
            )}
        </div>
    )
}

export default Navbar
