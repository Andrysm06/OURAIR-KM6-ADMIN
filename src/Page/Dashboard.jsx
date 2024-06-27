import React from "react";
import Card from "../Layout/Card";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-8 md:mt-24 space-y-12 h-screen">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800">
          Selamat datang admin ourair!
        </h1>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card title="Total Users" value="1,234" />
            <Card title="Total Sales" value="$5,678" />
            <Card title="New Orders" value="56" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
