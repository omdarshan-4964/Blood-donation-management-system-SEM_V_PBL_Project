import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState("All"); // Track the selected filter (Donors, Hospitals, or All)
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/"); // Replace with your backend endpoint
        setUsers(response.data); // Set the fetched users
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, []);

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

  // Filter users by role (Donor, Hospital, or All)
  const filteredUsers = users.filter(user => 
    roleFilter === "All" || user.role === roleFilter
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav className="flex gap-4">
            <button
              onClick={() => setRoleFilter("Hospital")} // Show hospitals
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Hospitals List
            </button>
            <button
              onClick={() => setRoleFilter("Donor")} // Show donors
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Donors List
            </button>
            <button
              onClick={handleProfile} // Navigate to Profile page
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Profile
            </button>
            <button
              onClick={handleLogout} // Handle Logout click
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-xl font-bold mb-4">
          {roleFilter === "All" ? "All Users" : `${roleFilter}s List`}
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="table-auto w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Blood Type</th>
                <th className="px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{user.location || "N/A"}</td>
                  <td className="px-4 py-2">{user.contactNumber || "N/A"}</td>
                  <td className="px-4 py-2">{user.bloodType || "N/A"}</td>
                  <td className="px-4 py-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [bloodRequests, setBloodRequests] = useState([]);
//   const [showBloodRequests, setShowBloodRequests] = useState(false);

//   useEffect(() => {
//     // Fetching blood requests from the corrected API route
//     axios
//       .get("http://localhost:5000/api/v1/blood-requests")
//       .then((response) => {
//         setBloodRequests(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching blood requests:", error);
//       });
//   }, []);

//   // Function to filter blood requests by status
//   const filterBloodRequests = (status) => {
//     return bloodRequests.filter(request => request.status === status);
//   };

//   return (
//     <div>
//       <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={() => setShowBloodRequests(!showBloodRequests)}
//           className="bg-green-500 px-4 py-2 rounded text-white"
//         >
//           {showBloodRequests ? "Hide Blood Requests" : "Blood Requests"}
//         </button>
//       </header>

//       {showBloodRequests && (
//         <main className="p-4">
//           <h2 className="text-lg font-semibold mb-4">Blood Requests</h2>

//           {/* Blood Requests by Status */}
//           <div>
//             {/* Pending Requests */}
//             <h3 className="font-semibold mb-2">Pending Requests</h3>
//             <table className="table-auto w-full bg-white shadow rounded mb-8">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2">Request ID</th>
//                   <th className="px-4 py-2">Blood Type</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Units Needed</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterBloodRequests("Pending").map((request) => (
//                   <tr key={request._id} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-2">{request._id}</td>
//                     <td className="px-4 py-2">{request.bloodType}</td>
//                     <td className="px-4 py-2">{request.location}</td>
//                     <td className="px-4 py-2">{request.unitsNeeded}</td>
//                     <td className="px-4 py-2">{request.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Accepted Requests */}
//             <h3 className="font-semibold mb-2">Accepted Requests</h3>
//             <table className="table-auto w-full bg-white shadow rounded mb-8">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2">Request ID</th>
//                   <th className="px-4 py-2">Blood Type</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Units Needed</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterBloodRequests("Accepted").map((request) => (
//                   <tr key={request._id} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-2">{request._id}</td>
//                     <td className="px-4 py-2">{request.bloodType}</td>
//                     <td className="px-4 py-2">{request.location}</td>
//                     <td className="px-4 py-2">{request.unitsNeeded}</td>
//                     <td className="px-4 py-2">{request.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Completed Requests */}
//             <h3 className="font-semibold mb-2">Completed Requests</h3>
//             <table className="table-auto w-full bg-white shadow rounded mb-8">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2">Request ID</th>
//                   <th className="px-4 py-2">Blood Type</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Units Needed</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterBloodRequests("Completed").map((request) => (
//                   <tr key={request._id} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-2">{request._id}</td>
//                     <td className="px-4 py-2">{request.bloodType}</td>
//                     <td className="px-4 py-2">{request.location}</td>
//                     <td className="px-4 py-2">{request.unitsNeeded}</td>
//                     <td className="px-4 py-2">{request.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [roleFilter, setRoleFilter] = useState("All"); // Track the selected filter (Donors, Hospitals, or All)
//   const [bloodRequests, setBloodRequests] = useState([]);
//   const [showBloodRequests, setShowBloodRequests] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Fetch all users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/auth/"); // Replace with your backend endpoint
//         setUsers(response.data); // Set the fetched users
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Fetch blood requests
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/v1/blood-requests")
//       .then((response) => {
//         setBloodRequests(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching blood requests:", error);
//       });
//   }, []);

//   // Filter blood requests by status
//   const filterBloodRequests = (status) => {
//     return bloodRequests.filter(request => request.status === status);
//   };

//   // Handle Profile navigation
//   const handleProfile = () => {
//     navigate("/profile"); // Navigate to the profile page
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");
//     navigate("/"); // Redirect to Home Page or Login Page
//   };

//   // Filter users by role (Donor, Hospital, or All)
//   const filteredUsers = users.filter(user => 
//     roleFilter === "All" || user.role === roleFilter
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//           <nav className="flex gap-4">
//             <button
//               onClick={() => setRoleFilter("Hospital")} // Show hospitals
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               Hospitals List
//             </button>
//             <button
//               onClick={() => setRoleFilter("Donor")} // Show donors
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               Donors List
//             </button>
//             <button
//               onClick={handleProfile} // Navigate to Profile page
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Profile
//             </button>
//             <button
//               onClick={handleLogout} // Handle Logout click
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//             <button
//               onClick={() => setShowBloodRequests(!showBloodRequests)} // Toggle blood requests visibility
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               {showBloodRequests ? "Hide Blood Requests" : "Blood Requests"}
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="p-8">
//         {/* User List Section */}
//         <h2 className="text-xl font-bold mb-4">
//           {roleFilter === "All" ? "All Users" : `${roleFilter}s List`}
//         </h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : filteredUsers.length === 0 ? (
//           <p>No users found.</p>
//         ) : (
//           <table className="table-auto w-full bg-white shadow rounded">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">User ID</th>
//                 <th className="px-4 py-2">Location</th>
//                 <th className="px-4 py-2">Contact</th>
//                 <th className="px-4 py-2">Blood Type</th>
//                 <th className="px-4 py-2">Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr key={user._id} className="border-b hover:bg-gray-100">
//                   <td className="px-4 py-2">{user.name}</td>
//                   <td className="px-4 py-2">{user.email}</td>
//                   <td className="px-4 py-2">{user._id}</td>
//                   <td className="px-4 py-2">{user.location || "N/A"}</td>
//                   <td className="px-4 py-2">{user.contactNumber || "N/A"}</td>
//                   <td className="px-4 py-2">{user.bloodType || "N/A"}</td>
//                   <td className="px-4 py-2">{user.role}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* Blood Requests Section */}
//         {showBloodRequests && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Blood Requests</h2>
            
//             {/* Pending Requests */}
//             <h3 className="font-semibold mb-2">Pending Requests</h3>
//             <table className="table-auto w-full bg-white shadow rounded mb-8">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2">Request ID</th>
//                   <th className="px-4 py-2">Blood Type</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Units Needed</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterBloodRequests("Pending").map((request) => (
//                   <tr key={request._id} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-2">{request._id}</td>
//                     <td className="px-4 py-2">{request.bloodType}</td>
//                     <td className="px-4 py-2">{request.location}</td>
//                     <td className="px-4 py-2">{request.unitsNeeded}</td>
//                     <td className="px-4 py-2">{request.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Accepted Requests */}
//             <h3 className="font-semibold mb-2">Accepted Requests</h3>
//             <table className="table-auto w-full bg-white shadow rounded mb-8">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2">Request ID</th>
//                   <th className="px-4 py-2">Blood Type</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Units Needed</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterBloodRequests("Accepted").map((request) => (
//                   <tr key={request._id} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-2">{request._id}</td>
//                     <td className="px-4 py-2">{request.bloodType}</td>
//                     <td className="px-4 py-2">{request.location}</td>
//                     <td className="px-4 py-2">{request.unitsNeeded}</td>
//                     <td className="px-4 py-2">{request.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Completed Requests */}
//             <h3 className="font-semibold mb-2">Completed Requests</h3>
//             <table className="table-auto w-full bg-white shadow rounded mb-8">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2">Request ID</th>
//                   <th className="px-4 py-2">Blood Type</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Units Needed</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterBloodRequests("Completed").map((request) => (
//                   <tr key={request._id} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-2">{request._id}</td>
//                     <td className="px-4 py-2">{request.bloodType}</td>
//                     <td className="px-4 py-2">{request.location}</td>
//                     <td className="px-4 py-2">{request.unitsNeeded}</td>
//                     <td className="px-4 py-2">{request.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [roleFilter, setRoleFilter] = useState("All"); // Track the selected filter (Donors, Hospitals, or All)
//   const [bloodRequests, setBloodRequests] = useState([]);
//   const [showBloodRequests, setShowBloodRequests] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Fetch all users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/auth/"); // Replace with your backend endpoint
//         setUsers(response.data); // Set the fetched users
//       } catch (error) {
//         console.error("Error fetching users:", error.message);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Fetch blood requests
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/v1/blood-requests")
//       .then((response) => {
//         setBloodRequests(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching blood requests:", error);
//       });
//   }, []);

//   // Filter blood requests by status
//   const filterBloodRequests = (status) => {
//     return bloodRequests.filter(request => request.status === status);
//   };

//   // Handle Profile navigation
//   const handleProfile = () => {
//     navigate("/profile"); // Navigate to the profile page
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");
//     navigate("/"); // Redirect to Home Page or Login Page
//   };

//   // Filter users by role (Donor, Hospital, or All)
//   const filteredUsers = users.filter(user => 
//     roleFilter === "All" || user.role === roleFilter
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//           <nav className="flex gap-4">
//             <button
//               onClick={() => setRoleFilter("Hospital")} // Show hospitals
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               Hospitals List
//             </button>
//             <button
//               onClick={() => setRoleFilter("Donor")} // Show donors
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               Donors List
//             </button>
//             <button
//               onClick={handleProfile} // Navigate to Profile page
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Profile
//             </button>
//             <button
//               onClick={handleLogout} // Handle Logout click
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//             <button
//               onClick={() => setShowBloodRequests(!showBloodRequests)} // Toggle blood requests visibility
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             >
//               {showBloodRequests ? "Hide Blood Requests" : "Blood Requests"}
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="p-8">
//         {/* User List Section */}
//         <h2 className="text-xl font-bold mb-4">
//           {roleFilter === "All" ? "All Users" : `${roleFilter}s List`}
//         </h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : filteredUsers.length === 0 ? (
//           <p>No users found.</p>
//         ) : (
//           <table className="table-auto w-full bg-white shadow rounded">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Email</th>
//                 <th className="px-4 py-2">User ID</th>
//                 <th className="px-4 py-2">Location</th>
//                 <th className="px-4 py-2">Contact</th>
//                 <th className="px-4 py-2">Blood Type</th>
//                 <th className="px-4 py-2">Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr key={user._id} className="border-b hover:bg-gray-100">
//                   <td className="px-4 py-2">{user.name}</td>
//                   <td className="px-4 py-2">{user.email}</td>
//                   <td className="px-4 py-2">{user._id}</td>
//                   <td className="px-4 py-2">{user.location || "N/A"}</td>
//                   <td className="px-4 py-2">{user.contactNumber || "N/A"}</td>
//                   <td className="px-4 py-2">{user.bloodType || "N/A"}</td>
//                   <td className="px-4 py-2">{user.role}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* Blood Requests Section */}
//         {showBloodRequests && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Blood Requests</h2>
            
//             {/* Pending Requests */}
//             <h3 className="font-semibold mb-2">Pending Requests</h3>
//             <table className="table-auto w-full bg-white shadow rounded mb-8">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2">Request ID</th>
//                   <th className="px-4 py-2">Blood Type</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Units Needed</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterBloodRequests("Pending").map((request) => (
//                   <tr key={request._id} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-2">{request._id}</td>
//                     <td className="px-4 py-2">{request.bloodType}</td>
//                     <td className="px-4 py-2">{request.location}</td>
//                     <td className="px-4 py-2">{request.unitsNeeded}</td>
//                     <td className="px-4 py-2">{request.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Accepted Requests */}
//             <h3 className="font-semibold mb-2">Accepted Requests</h3>
//             <table className="table-auto w-full bg-white shadow rounded mb-8">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2">Request ID</th>
//                   <th className="px-4 py-2">Blood Type</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Units Needed</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterBloodRequests("Accepted").map((request) => (
//                   <tr key={request._id} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-2">{request._id}</td>
//                     <td className="px-4 py-2">{request.bloodType}</td>
//                     <td className="px-4 py-2">{request.location}</td>
//                     <td className="px-4 py-2">{request.unitsNeeded}</td>
//                     <td className="px-4 py-2">{request.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Completed Requests */}
//             <h3 className="font-semibold mb-2">Completed Requests</h3>
//             <table className="table-auto w-full bg-white shadow rounded mb-8">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="px-4 py-2">Request ID</th>
//                   <th className="px-4 py-2">Blood Type</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Units Needed</th>
//                   <th className="px-4 py-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterBloodRequests("Completed").map((request) => (
//                   <tr key={request._id} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-2">{request._id}</td>
//                     <td className="px-4 py-2">{request.bloodType}</td>
//                     <td className="px-4 py-2">{request.location}</td>
//                     <td className="px-4 py-2">{request.unitsNeeded}</td>
//                     <td className="px-4 py-2">{request.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
