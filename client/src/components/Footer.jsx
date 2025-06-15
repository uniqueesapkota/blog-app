import React from 'react';
import { footer_data } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-100 py-12'>
      <div className='mx-8 sm:mx-16 xl:mx-24 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8'>
        <div>
          <h2 className='text-xl font-bold text-gray-800'>Quickblog</h2>
          <p className='text-gray-600 mt-4'>QuickBlog is your go-to platform for sharing ideas, exploring new perspectives, and staying updated with the latest trends. Whether you're a seasoned writer or a curious reader, QuickBlog offers a space to connect, learn, and grow.</p>
        </div>
        {footer_data.map((section, index) => (
          <div key={index}>
            <h3 className='text-lg font-semibold text-gray-800'>{section.title}</h3>
            <ul className='mt-4 space-y-2'>
              {section.links.map((link, idx) => (
                <li
                  key={idx}
                  className='text-gray-600 hover:text-indigo-600 hover:scale-105 transition-transform duration-200 cursor-pointer'
                >
                  {link === 'Home' ? (
                    <Link to="/">{link}</Link>
                  ) : (
                    link
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='text-center mt-12 text-gray-500'>
        Copyright 2025 © Unique-Sapkoata All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
