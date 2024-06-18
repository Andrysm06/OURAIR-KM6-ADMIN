import React from "react";
import Card from "../Layout/Card";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="mt-24 space-y-12 h-screen">
          <div className="p-4 h-full flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card title="Total Users" value="1,234" />
              <Card title="Total Sales" value="$5,678" />
              <Card title="New Orders" value="56" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
