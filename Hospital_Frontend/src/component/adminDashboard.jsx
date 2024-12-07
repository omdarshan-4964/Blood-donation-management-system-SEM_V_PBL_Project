
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

  // Handle Delete User
  const handleDelete = async (userId) => {
    try {
      // Send DELETE request to the backend
      await axios.delete(`http://localhost:5000/api/auth/${userId}`);
      // Remove the user from the state after successful deletion
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-pink-400 to-red-500">
      {/* Header */}
      <header className="bg-white bg-opacity-20 backdrop-blur-md shadow p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
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
      <main className="p-8 text-white">
        <h2 className="text-xl font-bold mb-4">
          {roleFilter === "All" ? "All Users" : `${roleFilter}s List`}
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-white bg-opacity-80 rounded-lg shadow-lg">
            <table className="table-auto w-full">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">User ID</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Contact</th>
                  <th className="px-4 py-2 text-left">Blood Type</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th> {/* New column for Delete button */}
                </tr>
              </thead>
              <tbody className="bg-white text-gray-900">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">{user.location || "N/A"}</td>
                    <td className="px-4 py-2">{user.contactNumber || "N/A"}</td>
                    <td className="px-4 py-2">{user.bloodType || "N/A"}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(user._id)} // Delete action
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
      </main>
    </div>
  );
};

export default AdminDashboard;


