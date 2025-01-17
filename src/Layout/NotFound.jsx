import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import imageNotfound from "../../public/404.svg";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <div className="text-center p-8 transform transition duration-500 ">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-6xl text-yellow-500 mb-4 animate-bounce"
        />
        <div className="flex justify-center mb-4">
          <img src={imageNotfound} alt="Not Found" className="h-24" />
        </div>
        <h1 className="text-4xl font-extrabold text-blue-600">
          Oops! Halaman Tidak Ditemukan
        </h1>
        <p className="text-2xl  mt-4">
          Halaman yang Anda cari mungkin telah dihapus atau untuk sementara
          tidak tersedia.
        </p>
        <a
          href="/Welcome"
          className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800"
        >
          Kembali
        </a>
      </div>
    </div>
  );
};

export default NotFound;
