import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../components/ButtonPrimary";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/auth/signin`,
        { email, password }
      );

      const { data } = response;

      if (data.status) {
        localStorage.setItem("token", data.data.token);
        setErrorMessage(""); // Clear error message on successful login
        if (data.data.isVerified) {
          navigate("/Dashboard");
        } else {
          setErrorMessage("Email belum terverifikasi.");
        }
      } else {
        setErrorMessage(data.message); // Set error message from API response
      }
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setErrorMessage(data.message || "Permintaan tidak valid."); // Display backend error message if available
        } else if (status === 401) {
          setErrorMessage("Email atau password salah.");
        } else if (status === 404) {
          setErrorMessage("Email tidak terdaftar.");
        } else {
          setErrorMessage("Terjadi kesalahan saat login.");
        }
      } else {
        setErrorMessage("Terjadi kesalahan saat login.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 md:px-0 bg-gray-100">
      <div className="w-full max-w-sm relative bg-white p-8 rounded-lg shadow-md">
        <h1 className="mb-5 text-2xl text-center font-bold text-gray-700">
          Masuk
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Masukkan email"
              className={`w-full px-4 py-2 rounded-lg border ${
                errorMessage ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errorMessage ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border-blue-500`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>
          <ButtonPrimary text="Masuk" type="submit" />
          {errorMessage && (
            <div className="mt-4 text-red-500 text-center text-sm">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
