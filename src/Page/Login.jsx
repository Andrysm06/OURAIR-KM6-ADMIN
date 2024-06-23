import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../components/ButtonPrimary";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (email !== "adminourair@gmail.com") {
      setEmailError("Email tidak valid");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password !== "admin12345") {
      setPasswordError("Password salah");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      // Successful login logic
      console.log("Login successful");
      navigate("/Dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 md:px-0 bg-gray-100">
      <div className="w-full max-w-sm relative bg-white p-8 rounded-lg shadow-md">
        <a
          href="https://ourair-km-6-frontend-final-project.vercel.app/"
          className="absolute top-3 left-3 text-gray-600 hover:text-gray-800"
          aria-label="Go back"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
        </a>
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
              type="text"
              placeholder="Contoh: Jhondoe@gmail.com"
              className={`w-full px-4 py-2 rounded-lg border ${
                emailError ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div className="text-red-500 text-xs mt-1">{emailError}</div>
            )}
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-600"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className={`w-full px-4 py-2 rounded-lg border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border-blue-500`}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="h-5 w-5"
                />
              </button>
            </div>
            {passwordError && (
              <div className="text-red-500 text-xs mt-1">{passwordError}</div>
            )}
          </div>
          <ButtonPrimary text="Masuk" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
