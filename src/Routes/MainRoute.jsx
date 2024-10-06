import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Homepage/HomePage";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Product from "../pages/Products/Product";
import PrivateRoute from "./PrivateRoute";

const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MainRoute;
