import React from "react";
import { FaHome, FaProductHunt, FaUserPlus, FaSignInAlt } from "react-icons/fa"; // Import the required icons
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-center mt-5 bg-[#3699df] text-white h-12">
        <ul className="flex gap-60 text-lg py-2 cursor-pointer">
          <li className="flex items-center gap-2">
            <FaHome /> 
            <Link to="/">Home</Link>
          </li>
          <li className="flex items-center gap-2">
            <FaProductHunt /> 
            <Link to="/product">Products</Link>
          </li>
          <li className="flex items-center gap-2">
            <FaUserPlus /> 
            <Link to="/signup">SignUp</Link>
          </li>
          <li className="flex items-center gap-2">
            <FaSignInAlt />
            <Link to="/login">Login</Link>  
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
