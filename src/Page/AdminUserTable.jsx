import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const AdminUserTable = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    phone_number: "",
    created_at: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/users?limit=8000`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        handleFetchError(error);
      }
    };

    fetchUsers();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized - Please log in again.");
      // Handle unauthorized access (e.g., redirect to login)
    } else {
      console.error("Error fetching users:", error.message);
      // Handle other errors (e.g., display an error message to the user)
    }
  };

  // Delete user function
  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers(users.filter((user) => user?.id !== id));
    } catch (error) {
      handleRequestError(error);
    }
  };

  // Create user function
  const createUser = async () => {
    try {
      const { name, email, phone_number, role } = formData;
      const response = await axios.post(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/users`,
        { name, email, phone_number, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers([...users, response.data.data]);
      closeModal();
    } catch (error) {
      handleRequestError(error);
    }
  };

  // Update user function
  const updateUser = async (id) => {
    try {
      const { name, phone_number, role } = formData;
      const response = await axios.put(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/users/${id}`,
        { name, phone_number, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers(
        users.map((user) => (user?.id === id ? response.data?.data : user))
      );
      closeModal();
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleRequestError = (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized - Please log in again.");
      // Handle unauthorized access
    } else if (error.response && error.response.status === 400) {
      console.error("Bad request. Invalid user data provided.");
      // Handle invalid user data error
    } else if (error.response && error.response.status === 404) {
      console.error("User not found.");
      // Handle user not found error
    } else {
      console.error("Error:", error.message);
      // Handle other errors
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddUser = () => {
    createUser();
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setFormData(user);
    setModalOpen(true);
  };

  const handleUpdateUser = () => {
    updateUser(formData.id);
  };

  const handleDeleteUser = (userId) => {
    setDeleteModalOpen(true);
    setUserToDelete(userId);
  };

  const confirmDeleteUser = () => {
    deleteUser(userToDelete);
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setFormData({
      id: null,
      name: "",
      email: "",
      role: "",
      phone_number: "",
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-300 flex flex-col">
      <Navbar />
      <div className="container mx-auto mt-8 md:mt-24 space-y-12 h-screen  px-4">
        <h1 className="text-xl font-bold mt-6">User Data</h1>

        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 rounded-lg">
              <tr className="rounded-lg">
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  tanggal
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user?.id}>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user?.id}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user?.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user?.phone_number}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user?.role}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user?.created_at}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user?.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setModalOpen(true)}
        >
          Add User
        </button>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <motion.button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
            } px-4 py-2 rounded-full mr-2`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Prev
          </motion.button>
          {[...Array(totalPages > 8 ? 8 : totalPages).keys()].map((num) => {
            const pageNumber =
              currentPage > 5 ? currentPage + num - 4 : num + 1;
            return (
              <motion.button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                } px-4 py-2 rounded-full mr-2`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {pageNumber}
              </motion.button>
            );
          })}
          {totalPages > 8 && (
            <motion.button
              onClick={() => setCurrentPage(currentPage + 8)}
              className="bg-gray-300 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ...
            </motion.button>
          )}
          <motion.button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 text-white"
            } px-4 py-2 rounded-full ml-2`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Next
          </motion.button>
        </div>
      </div>

      {/* Modal for Adding/Editing User */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center  justify-center z-10">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <motion.div
            className="relative bg-white rounded-lg p-8 max-w-md w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit User" : "Add User"}
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    isEditing ? "bg-gray-100 opacity-50" : ""
                  }`}
                  disabled={isEditing}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  phone number
                </label>
                <input
                  type="phone_number"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option>USER</option>
                    <option>ADMIN</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={isEditing ? handleUpdateUser : handleAddUser}
                  className={`py-2 px-4 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isEditing ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
                onClick={() => setDeleteModalOpen(false)}
              >
                <svg
                  className="h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">Confirm Delete User</h2>
              <p className="text-sm text-gray-700">
                Are you sure you want to delete this user?
              </p>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className="mr-4 py-2 px-4 text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteUser}
                  className="py-2 px-4 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default AdminUserTable;
