import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export const Url = import.meta.env.SERVER_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://product-server-repo.onrender.com/login`,formData,{withCredentials: true}).then((response) => {
      console.log(response.data);
      alert('Login successful');
      localStorage.setItem('token', JSON.stringify(response.data.token));
      navigate('/product')
    }).catch((error) => {
      console.log(error);
     
      
    });
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm">
              Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
