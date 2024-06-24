import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Dashboard from "./Page/Dashboard";
import Login from "./Page/Login";
import Notification from "./Page/Notification";
import PrivateRoute from "./PrivateRoute";

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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
