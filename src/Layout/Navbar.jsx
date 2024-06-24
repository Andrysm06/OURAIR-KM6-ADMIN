import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import iconFaBell from "../../public/fi_bell.svg";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
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
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleConfirmLogout = () => {
    setConfirmLogout(true);
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false);
    setSidebarVisible(false); // Menutup sidebar
  };

  return (
    <>
      <nav
        className={`fixed top-2 left-0 right-0 z-10 bg-transparent p-4 transition-all`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
              <FontAwesomeIcon icon={faList} className="px-2 h-5 mt-1" />
            </button>
            <Link to="/Notification">
              <img src={iconFaBell} alt="faBell" className="px-2 h-6" />
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-20 transition-all duration-300 ${
          sidebarVisible ? "bg-black bg-opacity-50" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <button
              onClick={toggleSidebar}
              className="flex items-center mt-4 px-2 py-2 text-black hover:text-blue-500 rounded-lg"
              aria-label="Close Sidebar"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-5 mr-2" />
              Kembali
            </button>
            <div className="flex flex-col mt-4">
              <Link
                to="/profile"
                className="text-black hover:text-blue-500 mb-4"
              >
                Users
              </Link>
              <Link to="/about" className="text-black hover:text-blue-500 mb-4">
                Destination
              </Link>
              <button
                className="py-2"
                aria-label="Logout"
                onClick={handleConfirmLogout}
              >
                <span className="text-lg hover:text-red-500">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmLogout && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
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
