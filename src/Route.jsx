import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./Page/Dashboard";
import Login from "./Page/Login";
import Notification from "./Page/Notification";
import PrivateRoute from "./PrivateRoute";
import AdminUserTable from "./Page/AdminUserTable";
import NotFound from "./NotFound"; // Import komponen NotFound

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/notification",
    element: (
      <PrivateRoute>
        <Notification />
      </PrivateRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <PrivateRoute>
        <AdminUserTable />
      </PrivateRoute>
    ),
  },
  {
    path: "*", // Rute wildcard untuk halaman NotFound
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
