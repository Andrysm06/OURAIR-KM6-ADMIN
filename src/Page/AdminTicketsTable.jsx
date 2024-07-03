import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const AdminTicketsTable = () => {
  const [tickets, setTickets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [passengerId, setPassengerId] = useState("");
  const [flightId, setFlightId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [editTicket, setEditTicket] = useState(null);

  // Function to fetch all tickets
  const fetchAllTickets = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/tickets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Tickets:", response.data); // Log the data received from the API
      return response.data; // Return the data to the caller
    } catch (error) {
      handleRequestError(error); // Handle any errors that occur during the request
    }
  };

  // Function to create or update ticket
  const saveTicket = async () => {
    try {
      if (editTicket) {
        // Update existing ticket
        await axios.put(
          `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/tickets/${
            editTicket.id
          }`,
          {
            passenger_id: passengerId,
            flight_id: flightId,
            transaction_id: transactionId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Create new ticket
        await axios.post(
          `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/tickets`,
          {
            passenger_id: passengerId,
            flight_id: flightId,
            transaction_id: transactionId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      const data = await fetchAllTickets();
      updateTicketsState(data);
      closeModal();
    } catch (error) {
      handleRequestError(error);
    }
  };

  // Function to delete a ticket
  const deleteTicket = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await fetchAllTickets();
      updateTicketsState(data);
    } catch (error) {
      handleRequestError(error);
    }
  };

  // Function to create tickets
  const createTickets = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_DOMAIN_API_DEV}/api/v1/tickets/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await fetchAllTickets();
      updateTicketsState(data);
    } catch (error) {
      handleRequestError(error);
    }
  };

  // Function to handle request errors
  const handleRequestError = (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized - Please log in again.");
      // Handle unauthorized access (e.g., redirect to login)
    } else {
      console.error("Error:", error.message);
      setErrorMessage("Failed to perform operation. Please try again.");
    }
  };

  // Function to update tickets state
  const updateTicketsState = (data) => {
    if (Array.isArray(data)) {
      setTickets(data);
      setErrorMessage("");
    } else if (data && data.message) {
      setErrorMessage(data.message);
    } else {
      setErrorMessage("Error fetching tickets");
    }
  };

  // Function to open modal for create or edit
  const openModal = (ticket) => {
    if (ticket) {
      // Edit mode
      console.log("Edit Ticket:", ticket);
      setEditTicket(ticket);
      setPassengerId(ticket.passenger_id || ""); // Ensure ticket.passenger_id exists
      setFlightId(ticket.flight_id || "");
      setTransactionId(ticket.transaction_id || "");
    } else {
      // Create new mode
      console.log("Create New Ticket");
      setEditTicket(null);
      setPassengerId("");
      setFlightId("");
      setTransactionId("");
    }
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setPassengerId("");
    setFlightId("");
    setTransactionId("");
    setEditTicket(null);
  };

  // Effect to fetch tickets on component mount
  useEffect(() => {
    const getTickets = async () => {
      try {
        const data = await fetchAllTickets();
        updateTicketsState(data);
      } catch (error) {
        console.error("Error in fetching tickets:", error.message);
        setErrorMessage("Error fetching tickets");
      }
    };

    getTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-300 flex flex-col">
      <Navbar />
      <div className="container mx-auto mt-8 md:mt-24 space-y-12 h-screen px-4">
        <h1 className="text-xl font-bold mt-6">User Tickets</h1>

        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        {tickets.length === 0 && !errorMessage && (
          <div className="mb-4 text-gray-500">No tickets available.</div>
        )}
        {tickets.length > 0 && (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Passenger ID
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Flight ID
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket?.id}>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {ticket?.id}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {ticket?.passenger_id}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {ticket?.flight_id}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {ticket?.transaction_id}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm space-x-2">
                      <button
                        onClick={() => openModal(ticket)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTicket(ticket?.id)}
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
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
              {editTicket ? (
                <>
                  <h2 className="text-lg font-semibold mb-4">Edit Ticket</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Passenger ID
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={passengerId}
                      onChange={(e) => setPassengerId(e?.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Flight ID
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={flightId}
                      onChange={(e) => setFlightId(e?.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e?.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-4">Create Ticket</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Passenger ID
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={passengerId}
                      onChange={(e) => setPassengerId(e?.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Flight ID
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={flightId}
                      onChange={(e) => setFlightId(e?.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e?.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={closeModal}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={saveTicket}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => createTickets(ticket?.id)}
        >
          Add Tickets
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AdminTicketsTable;
