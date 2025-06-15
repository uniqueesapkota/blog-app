import React from 'react';

const Newsletter = () => {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 my-16 text-center'>
      <h2 className='text-2xl sm:text-4xl font-bold text-gray-800'>Never Miss a Blog!</h2>
      <p className='text-gray-600 mt-4'>Subscribe to get the latest blog, new tech, and exclusive news.</p>
      <form className='flex justify-center mt-8 max-w-lg mx-auto'>
        <input
          type='email'
          placeholder='Enter your email id'
          required
          className='w-full px-4 py-2 border border-gray-300 rounded-l-lg outline-none'
        />
        <button
          type='submit'
          className='bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-200'
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
