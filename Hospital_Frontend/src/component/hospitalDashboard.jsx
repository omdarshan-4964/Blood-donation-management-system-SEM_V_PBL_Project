import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const HospitalDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch all accepted requests for the logged-in hospital
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/blood-requests?status=Accepted"
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching blood requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleUpdateHistory = async (requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/blood-requests/${requestId}/update-history`
      );
      alert(response.data.message); // Notify the hospital about successful update
    } catch (error) {
      console.error("Error updating history:", error);
      alert("Failed to update history.");
    }
  };

  // Handle Add Request button
  const handleAddRequest = () => {
    navigate("/bloodRequestPage"); // Navigate to the blood request page
  };

  // Handle Profile navigation
  const handleProfile = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/"); // Redirect to Home Page or Login Page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold">Hospital Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleAddRequest} // Handle Add Request button click
            className="px-4 py-2 bg-green-500 text-white rounded shadow"
          >
            Add Request
          </button>
          <button
            onClick={handleProfile} // Navigate to Profile page
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded shadow"
          >
            Profile
          </button>
          <button
            onClick={handleLogout} // Handle Logout click
            className="px-4 py-2 bg-red-500 text-white rounded shadow"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white p-4 rounded shadow border"
          >
            <h2 className="text-xl font-semibold">Request</h2>
            <p>
              <strong>Hospital Name:</strong> {request._id}
            </p>
            <p>
              <strong>Blood Group:</strong> {request.bloodType}
            </p>
            <p>
              <strong>Location:</strong> {request.location}
            </p>
            <p>
              <strong>Units Needed:</strong> {request.unitsNeeded}
            </p>
            <p className="mt-2 text-green-600 font-bold">Accepted</p>
            <button
              onClick={() => handleUpdateHistory(request._id)}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded shadow"
            >
              Update History
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDashboard;


