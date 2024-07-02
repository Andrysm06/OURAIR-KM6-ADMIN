import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import logo from "../../public/ourair_logo.svg"; // Sesuaikan path sesuai struktur proyek Anda
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-yellow-400 flex flex-col">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center items-center h-24 mt-8"
      >
        <img src={logo} alt="OurAir Logo" className="h-16 w-auto" />{" "}
        {/* Sesuaikan ukuran jika diperlukan */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="container mx-auto flex flex-col items-center justify-center flex-1 mt-8"
      >
        <h1 className="text-4xl font-bold text-white mb-8">
          Selamat datang admin ourair!
        </h1>
        <Link
          to="/Users"
          className="text-xl text-white mb-8 hover:text-blue-300"
        >
          Mulai
        </Link>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Dashboard;
