
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../api/axios';

const DonorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const donorId = localStorage.getItem("id"); // Fetch donor ID from localStorage.
  const token = localStorage.getItem("token"); // Correct token retrieval.

  // Fetch pending blood requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/api/v1/blood-requests", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers.
          },
        });
        // Filter only pending requests
        setRequests(response.data.filter((req) => req.status === "Pending"));
      } catch (error) {
        console.error("Error fetching blood requests:", error);
        alert("Failed to fetch blood requests. Please check your connection or token.");
      }
    };

    if (token) {
      fetchRequests();
    } else {
      alert("You are not authenticated. Please log in.");
      navigate("/login"); // Redirect to login if no token is found.
    }
  }, [token, navigate]);

  // Accept a blood request
  const acceptRequest = async (requestId) => {
    try {
      const response = await api.post(
        `/api/v1/blood-requests/${requestId}/accept`,
        { donorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { message, updatedRequest } = response.data;
      alert(message);

      // Update the UI to remove the accepted request
      setRequests((prev) => prev.filter((req) => req._id !== updatedRequest._id));
    } catch (error) {
      console.error("Error accepting blood request:", error);
      alert(error.response?.data?.message || "An error occurred while accepting the request.");
    }
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/"); // Redirect to Home Page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-pink-400 to-red-500 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg mx-4 mt-4">
        <h1 className="text-2xl font-bold tracking-wide">Donor Dashboard</h1>
        <div className="space-x-4">
          <NavLink to="/profile">
            <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition">
              Profile
            </button>
          </NavLink>
          <NavLink to="/my-history">
            <button className="px-4 py-2 bg-purple-500 text-white font-medium rounded-lg shadow-md hover:bg-purple-600 transition">
              My History
            </button>
          </NavLink>
          <button
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="p-6 bg-white bg-opacity-90 text-gray-900 rounded-lg shadow-lg border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-3 text-red-500">
              Blood Request
            </h2>
            <p className="mb-2">
              <strong>Hospital Name:</strong> {request.hospital?.name || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Blood Group:</strong> {request.bloodType || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {request.location || "Unknown"}
            </p>
            <p className="mb-2">
              <strong>Units Needed:</strong> {request.unitsNeeded || "Unknown"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Date: {new Date(request.createdAt).toLocaleDateString() || "Invalid Date"}
            </p>
            <button
              onClick={() => acceptRequest(request._id)}
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Accept Request
            </button>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center p-4 mt-6 bg-gray-900 text-white">
        <p>&copy; 2024 LifeLink Blood Donation Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DonorDashboard;
