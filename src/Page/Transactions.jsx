import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Layout/Navbar";

const TransactionById = () => {
  const [transactionId, setTransactionId] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [transactionData, setTransactionData] = useState({
    midtrans_order_id: "",
    adult_price: 0,
    baby_price: 0,
    tax_price: 0,
    total_price: 0,
    status: true, // default to Completed
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const getTransactionById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTransaction(response.data);
      setTransactionData({
        midtrans_order_id: response.data.midtrans_order_id,
        adult_price: response.data.adult_price,
        baby_price: response.data.baby_price,
        tax_price: response.data.tax_price,
        total_price: response.data.total_price,
        status: response.data.status,
      });
      setError(null);
    } catch (err) {
      setTransaction(null);
      if (err.response) {
        if (err.response.status === 401) {
          setError("Unauthorized, user not authenticated.");
        } else if (err.response.status === 404) {
          setError("Transaction tidak ada atau sudah dihapus!");
        } else {
          setError("Ada kesalahan internal");
        }
      } else {
        setError("Network Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTransactionById = async (id) => {
    setLoading(true);
    setSuccess(false);
    try {
      await axios.delete(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setError(null);
      setSuccess(true);
      setTransaction(null); // Clear transaction after deletion
    } catch (err) {
      setSuccess(false);
      if (err.response) {
        if (err.response.status === 401) {
          setError("Unauthorized, user not authenticated.");
        } else if (err.response.status === 404) {
          setError("Transaction not found");
        } else {
          setError("Internal Server Error");
        }
      } else {
        setError("Network Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionById = async (id, data) => {
    setLoading(true);
    try {
      // Convert prices to integers
      const updatedData = {
        ...data,
        adult_price: parseInt(data?.adult_price, 10),
        baby_price: parseInt(data?.baby_price, 10),
        tax_price: parseInt(data?.tax_price, 10),
        total_price: parseInt(data?.total_price, 10),
      };

      const response = await axios.put(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/transactions/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTransaction(response.data);
      setError(null);
      setSuccess(true);
      setIsUpdateModalOpen(false); // Close update modal after successful update
    } catch (err) {
      setTransaction(null);
      if (err.response) {
        if (err.response.status === 401) {
          setError("Unauthorized, user not authenticated.");
        } else if (err.response.status === 404) {
          setError("Transaction not found");
        } else {
          setError("Internal Server Error");
        }
      } else {
        setError("Network Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetSubmit = (e) => {
    e.preventDefault();
    getTransactionById(transactionId);
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    deleteTransactionById(transactionId);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateTransactionById(transactionId, transactionData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-300 flex flex-col items-center justify-center">
      <Navbar />
      <div className="container mx-auto mt-8 md:mt-24 space-y-4 px-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Transaction</h1>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4">
          <form onSubmit={handleGetSubmit}>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="transactionId"
              >
                Transaction ID
              </label>
              <input
                type="text"
                id="transactionId"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
            >
              Get Transaction
            </button>
          </form>
          {transaction && (
            <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-lg">
              <h2 className="text-lg font-bold mb-2">Transaction Details</h2>
              <p>
                <strong>ID:</strong> {transaction.id}
              </p>
              <p>
                <strong>Midtrans Order ID:</strong>{" "}
                {transaction.midtrans_order_id}
              </p>
              <p>
                <strong>Adult Price:</strong> {transaction.adult_price}
              </p>
              <p>
                <strong>Baby Price:</strong> {transaction.baby_price}
              </p>
              <p>
                <strong>Tax Price:</strong> {transaction.tax_price}
              </p>
              <p>
                <strong>Total Price:</strong> {transaction.total_price}
              </p>
              <p>
                <strong>Created At:</strong> {transaction.created_at}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {transaction.status ? "Completed" : "Pending"}
              </p>
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200 mt-4"
              >
                Update Transaction
              </button>
              <form onSubmit={handleDeleteSubmit}>
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 mt-4"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Transaction"}
                </button>
              </form>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && !error && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
              Tindakan berhasil diselesaikan!
            </div>
          )}
          {isUpdateModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 space-y-4 w-full max-w-xl">
                <h2 className="text-xl font-bold">Update Transaction</h2>
                <form
                  onSubmit={handleUpdateSubmit}
                  className="w-full bg-white rounded-lg shadow-md p-6 space-y-4"
                >
                  <div>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="transactionId"
                    >
                      Transaction ID
                    </label>
                    <input
                      id="transactionId"
                      name="transactionId"
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full px-3 py-2 border bg-gray-100 opacity-50 rounded-lg"
                      required
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="midtrans_order_id"
                    >
                      Midtrans Order ID
                    </label>
                    <input
                      id="midtrans_order_id"
                      name="midtrans_order_id"
                      type="text"
                      value={transactionData.midtrans_order_id}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border bg-gray-100 opacity-50 rounded-lg"
                      required
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="adult_price"
                    >
                      Adult Price
                    </label>
                    <input
                      id="adult_price"
                      name="adult_price"
                      type="number"
                      value={transactionData.adult_price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="baby_price"
                    >
                      Baby Price
                    </label>
                    <input
                      id="baby_price"
                      name="baby_price"
                      type="number"
                      value={transactionData.baby_price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="tax_price"
                    >
                      Tax Price
                    </label>
                    <input
                      id="tax_price"
                      name="tax_price"
                      type="number"
                      value={transactionData.tax_price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="total_price"
                    >
                      Total Price
                    </label>
                    <input
                      id="total_price"
                      name="total_price"
                      type="number"
                      value={transactionData.total_price}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="status"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={transactionData.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value={true}>Completed</option>
                      <option value={false}>Pending</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                    <button
                      type="button"
                      className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
                      onClick={() => setIsUpdateModalOpen(false)}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionById;
