import { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 md:px-0">
      <div className="w-full max-w-sm relative">
        <h1 className="mb-5 text-xl font-bold">Masuk</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Contoh: Jhondoe@gmail.com"
              className={`w-full input-primary outline-none ${
                emailError ? "border-red-500" : "focus:border-blue-500"
              }`}
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div className="text-red-500 text-xs">{emailError}</div>
            )}
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <Link
                to="/lupa-password"
                className="text-accent text-sm my-2"
                tabIndex={-1}
              >
                Lupa kata sandi
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className={`w-full input-primary outline-none ${
                  passwordError ? "border-red-500" : "focus:border-blue-500"
                }`}
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-0 top-0 py-[14px] px-1 rounded-e-xl"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-gray-400 h-[13px]"
                  width="32"
                  height="32"
                />
              </button>
            </div>
            {passwordError && (
              <div className="text-red-500 text-xs">{passwordError}</div>
            )}
          </div>
          <ButtonPrimary text={"Masuk"} />
        </form>
        <div className="text-center mt-4 text-sm">
          Belum punya akun?
          <Link to="/daftar" className="text-accent ml-1 font-[600]">
            Daftar disini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
