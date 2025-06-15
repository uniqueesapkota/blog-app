import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList' // Importing the BlogList component for displaying blog posts
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
// Importing the Navbar and Header components for the Home page

const Home = () => {
  return (
    <>
  <Navbar/>
  <Header/>
  <BlogList/>
  <Newsletter/>
  <Footer/>
  {/* The Newsletter component is included to allow users to subscribe for updates */}

    </>
  )
}

export default Home
