import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const AdminUserTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      role: "Editor",
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    setUsers([...users, { ...formData, id: users.length + 1 }]);
    setFormData({ id: null, name: "", email: "", role: "", status: "Active" });
    setModalOpen(false);
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setFormData(user);
    setModalOpen(true);
  };

  const handleUpdateUser = () => {
    setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
    setIsEditing(false);
    setFormData({ id: null, name: "", email: "", role: "", status: "Active" });
    setModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    setDeleteModalOpen(true);
    setUserToDelete(userId);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== userToDelete));
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setFormData({ id: null, name: "", email: "", role: "", status: "Active" });
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 md:mt-24 space-y-12 h-screen px-4">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>

        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteUser(user.id)}
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
        {modalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isEditing ? "Edit User" : "Add User"}
                      </h3>
                      <div className="mt-2">
                        <form className="w-full max-w-lg">
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="name"
                              >
                                Name
                              </label>
                              <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="role"
                              >
                                Role
                              </label>
                              <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="role"
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                              <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="status"
                              >
                                Status
                              </label>
                              <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                              >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {isEditing ? (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleUpdateUser}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleAddUser}
                    >
                      Add
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Konfirmasi penghapusan
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Apakah Anda yakin ingin menghapus pengguna ini? Aksi
                          ini tidak dapat dibatalkan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={confirmDeleteUser}
                  >
                    Hapus
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeDeleteModal}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserTable;
