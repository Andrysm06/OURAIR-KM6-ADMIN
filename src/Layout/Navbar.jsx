import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import iconFaBell from "../../public/fi_bell.svg";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [sidebarIcon, setSidebarIcon] = useState(faList);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setSidebarIcon(sidebarVisible ? faList : null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleConfirmLogout = () => {
    setConfirmLogout(true);
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false);
    setSidebarVisible(false);
    setSidebarIcon(faList);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-10 transition-all ${
          isSticky ? "backdrop-blur-md  shadow-lg" : "bg-transparent"
        } p-4`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            className="focus:outline-none"
          >
            <FontAwesomeIcon icon={sidebarIcon} className="h-5 text-gray-800" />
          </button>
          {/* <img
            src={iconFaBell}
            alt="Notification"
            className="h-6 cursor-pointer"
          /> */}
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-20 transition-opacity duration-300 ${
          sidebarVisible
            ? "bg-black bg-opacity-50"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-gray-800 text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            sidebarVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <button
              onClick={toggleSidebar}
              className="flex items-center mt-4 px-2 py-2 hover:text-blue-500 rounded-lg"
              aria-label="Close Sidebar"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="h-5 text-white mr-2"
              />
              Tutup
            </button>
            <div className="flex flex-col mt-4 space-y-4">
              <Link to="/users" className="hover:text-blue-500">
                Users
              </Link>
              {/* <Link to="/tickets" className="hover:text-blue-500">
                Tickets
              </Link> */}
              <Link to="/Transactions" className="hover:text-blue-500">
                Transaction by id
              </Link>
              <Link to="/send-notification" className="hover:text-blue-500">
                Send notification
              </Link>
              <button
                className="py-2 hover:text-red-500"
                aria-label="Logout"
                onClick={handleConfirmLogout}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmLogout && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="mb-4">Tetap ingin keluar?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
