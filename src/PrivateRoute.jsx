import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? (
    <Routes>
      <Route element={children} />
    </Routes>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
