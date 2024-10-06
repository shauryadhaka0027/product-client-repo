import React from 'react';
// import { Link } from 'react-router-dom';
import { FaHandSparkles } from 'react-icons/fa'; // Import the hand icon
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-5xl font-bold mb-4 flex items-center gap-2 my-36">
          Welcome to the Products Page
          <FaHandSparkles className="text-yellow-400" /> {/* Hand icon */}
        </h1>
        <p className="text-lg py-10">Click below to sign up and explore our products!</p>
        
        <Link 
          to="/signup" 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
          Sign Up
        </Link>
      </div>
    </>
  );
}

export default HomePage;
