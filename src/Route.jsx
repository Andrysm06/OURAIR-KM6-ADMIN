import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./Page/Dashboard";
import Login from "./Page/Login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "Dashboard",
      element: <Dashboard />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
