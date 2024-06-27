import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <div className="text-center p-8 transform transition duration-500 hover:scale-105">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-6xl text-yellow-500 mb-4 animate-bounce"
        />
        <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl text-gray-800 mt-4">Halaman Tidak Ditemukan</p>
        <p className="text-lg text-gray-600 mt-2">
          Halaman yang Anda cari mungkin telah dihapus, ada namanya diubah, atau
          untuk sementara tidak tersedia.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

export default NotFound;
