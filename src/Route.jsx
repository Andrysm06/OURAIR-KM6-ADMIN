import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Page/Dashboard";
import Login from "./Page/Login";

// import PrivateRoute from "./PrivateRoute";
import AdminUserTable from "./Page/AdminUserTable";
import NotFound from "../src/Layout/NotFound"; // Import komponen NotFound
import AdminTicketsTable from "./Page/AdminTicketsTable";

export const Routess = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<AdminUserTable />} />
        <Route path="/Tickets" element={<AdminTicketsTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
