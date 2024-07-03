import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Layout/Navbar";

const SendNotification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendNotification = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/notification/all`,
        { title, message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", response);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
      setResponse(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-300 p-4">
      <Navbar />
      <h1 className="text-xl font-bold mb-6 ">Send Notification</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={sendNotification}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send Notification
        </button>
        {response && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {response.message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendNotification;
