import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Page/Dashboard";
import Login from "./Page/Login";
import Notification from "./Page/Notification";
import PrivateRoute from "./PrivateRoute";
import AdminUserTable from "./Page/AdminUserTable";
import NotFound from "../src/Layout/NotFound"; // Import komponen NotFound

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/users" element={<AdminUserTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
