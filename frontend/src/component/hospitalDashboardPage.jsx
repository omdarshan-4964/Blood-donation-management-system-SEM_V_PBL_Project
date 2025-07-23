
import { useState, useEffect } from "react";
import { useNavigate,useLocation  } from "react-router-dom";
import axios from "axios";
import api from '../api/axios';

const HospitalDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { location1 } = location.state || {};

  // Fetch accepted blood requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "/api/v1/blood-requests?status=Accepted"
        );
        // alert(location1+""+JSON.stringify(response.data))
        let op=response.data.filter((ele)=>{
          return ele.location===location1;
        })
        setRequests(op);
      } catch (error) {
        console.error("Error fetching blood requests:", error);
        alert("Failed to fetch requests. Please check your connection.");
      }
    };

    fetchRequests();
  }, []);

  // Navigate to update history page
  const handleUpdateHistory = (requestId) => {
    // alert(requestId)
    
    navigate(`/update-history`, { state: { requestId } });
  }

  // Navigate to add blood request page
  const handleAddRequest = () => {
    navigate("/bloodRequestPage");
  };

  // Navigate to profile page
  const handleProfile = () => {
    navigate("/profile");
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-pink-400 to-red-500 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg mx-4 mt-4">
        <h1 className="text-2xl font-bold tracking-wide">Hospital Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleAddRequest}
            className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add Request
          </button>
          <button
            onClick={handleProfile}
            className="px-4 py-2 bg-purple-500 text-white font-medium rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request._id}
              className="p-6 bg-white bg-opacity-90 text-gray-900 rounded-lg shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-3 text-red-500">
                Blood Request
              </h2>
              <p className="mb-2">
                <strong>Blood Group:</strong> {request.bloodType || "Unknown"}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {request.location || "Unknown"}
              </p>
              <p className="mb-2">
                <strong>Units Needed:</strong> {request.unitsNeeded || "Unknown"}
              </p>
              <button
                onClick={() => handleUpdateHistory(request._id)}
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Update History
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg font-medium text-white col-span-full">
            No accepted blood requests available at the moment.
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center p-4 mt-6 bg-gray-900 text-white">
        <p>&copy; 2024 LifeLink Blood Donation Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HospitalDashboard;
