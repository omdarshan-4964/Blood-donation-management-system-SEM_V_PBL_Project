// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";


// const DonorDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();
//   const donorId = localStorage.getItem("userId"); // Fetch from localStorage or context.

//   // Fetch pending blood requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/v1/blood-requests");
//         const data = await response.json();
//         setRequests(data.filter((req) => req.status === "Pending"));
//       } catch (error) {
//         console.error("Error fetching blood requests:", error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   // Accept a blood request
//   const acceptRequest = async (requestId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/v1/blood-requests/${requestId}/accept`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ donorId }),
//         }
//       );

//       const data = await response.json();
//       alert(data.message);

//       // Update UI to remove the accepted request
//       setRequests((prev) => prev.filter((req) => req._id !== requestId));
//     } catch (error) {
//       console.error("Error accepting blood request:", error);
//     }
//   };

//   // Logout logic
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");
//     navigate("/"); // Redirect to Home Page
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
//         <h1 className="text-xl font-bold">Donor Dashboard</h1>
//         <div className="space-x-4">
//           <NavLink to="/profile">
//           <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => navigate("/profile")}>
//             Profile
//           </button>
//           </NavLink>
//           <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {requests.map((request) => (
//           <div
//             key={request._id}
//             className="p-4 bg-white shadow-lg rounded-lg border border-gray-200"
//           >
//             <h2 className="text-lg font-semibold mb-2">Request</h2>
//             <p>
//               <strong>Hospital Name:</strong> {request.name || "Unknown"}
//             </p>
//             <p>
//               <strong>Blood Group:</strong> {request.bloodType || "Unknown"}
//             </p>
//             <p>
//               <strong>Location:</strong> {request.location || "Unknown"}
//             </p>
//             <p>
//               <strong>Units Needed:</strong> {request.unitsNeeded || "Unknown"}
//             </p>
//             <p className="text-gray-500 text-sm">
//               Date: {new Date(request.date).toLocaleDateString() || "Invalid Date"}
//             </p>
//             <button
//               onClick={() => acceptRequest(request._id)}
//               className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
//             >
//               Accept Request
//             </button>
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// };

// export default DonorDashboard;


// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from 'axios';

// const DonorDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();
//   const donorId = localStorage.getItem("userId"); // Fetch from localStorage or context.

//   // Fetch pending blood requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/v1/blood-requests");
//         setRequests(response.data.filter((req) => req.status === "Pending"));
//       } catch (error) {
//         console.error("Error fetching blood requests:", error);
//       }
//     };

//     fetchRequests();
//   }, []);
  
//   const token = localStorage.getItem(token);
//   // Accept a blood request
//   const acceptRequest = async (requestId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/v1/blood-requests/${requestId}/accept`,
//         { donorId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const  { message, updatedRequest} = response.data;
//       alert(message);

//       // Update UI to remove the accepted request
//       setRequests((prev) => prev.filter((req) => req._id !== updatedRequest._id));
//     } catch (error) {
//       console.error("Error accepting blood request:", error);

//       alert(error.response.data.message || "An error occurred while accepting blood request");
//     }
//   };

//   // Logout logic
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");
//     navigate("/"); // Redirect to Home Page
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
//         <h1 className="text-xl font-bold">Donor Dashboard</h1>
//         <div className="space-x-4">
//           <NavLink to="/profile">
//             <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
//               Profile
//             </button>
//           </NavLink>
//           <NavLink to="/my-history">
//             <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
//               My History
//             </button>
//           </NavLink>
//           <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {requests.map((request) => (
//           <div
//             key={request._id}
//             className="p-4 bg-white shadow-lg rounded-lg border border-gray-200"
//           >
//             <h2 className="text-lg font-semibold mb-2">Request</h2>
//             <p><strong>Hospital Name:</strong> {request.hospital.name || "Unknown"}</p>
//             <p><strong>Blood Group:</strong> {request.bloodType || "Unknown"}</p>
//             <p><strong>Location:</strong> {request.location || "Unknown"}</p>
//             <p><strong>Units Needed:</strong> {request.unitsNeeded || "Unknown"}</p>
//             <p className="text-gray-500 text-sm">
//               Date: {new Date(request.createdAt).toLocaleDateString() || "Invalid Date"}
//             </p>
//             <button
//               onClick={() => acceptRequest(request._id)}
//               className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
//             >
//               Accept Request
//             </button>
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// };

// export default DonorDashboard;


import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const DonorDashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const donorId = localStorage.getItem("id"); // Fetch donor ID from localStorage.
  console.log(donorId);
  
  const token = localStorage.getItem("token"); // Correct token retrieval.

  // Fetch pending blood requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/blood-requests", {
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
      const response = await axios.post(
        `http://localhost:5000/api/v1/blood-requests/${requestId}/accept`,
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold">Donor Dashboard</h1>
        <div className="space-x-4">
          <NavLink to="/profile">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Profile
            </button>
          </NavLink>
          <NavLink to="/my-history">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
              My History
            </button>
          </NavLink>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="p-4 bg-white shadow-lg rounded-lg border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-2">Request</h2>
            <p><strong>Hospital Name:</strong> {request.hospital?.name || "Unknown"}</p>
            <p><strong>Blood Group:</strong> {request.bloodType || "Unknown"}</p>
            <p><strong>Location:</strong> {request.location || "Unknown"}</p>
            <p><strong>Units Needed:</strong> {request.unitsNeeded || "Unknown"}</p>
            <p className="text-gray-500 text-sm">
              Date: {new Date(request.createdAt).toLocaleDateString() || "Invalid Date"}
            </p>
            <button
              onClick={() => acceptRequest(request._id)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Accept Request
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default DonorDashboard;

