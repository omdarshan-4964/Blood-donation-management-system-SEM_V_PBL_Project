
import { useEffect, useState } from "react";
import api from '../api/axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view/edit mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodType: "",
    location: "",
    contactNumber: "",
    role: "",
  });

  useEffect(() => {
    // Fetch user profile by ID from localStorage
    const fetchProfile = async () => {
      const userId = localStorage.getItem("id"); // Get userId from localStorage

      if (!userId) {
        console.error("No user ID found in localStorage");
        return;
      }

      try {
        // Pass the userId as a header for authorization in the request
        const response = await api.get("/api/auth/user", {
          headers: {
            id: userId, // Add userId as a custom header
          },
        });

        setProfile(response.data); // Set the profile data
        setFormData({
          name: response.data.name,
          email: response.data.email,
          bloodType: response.data.bloodType || "",
          location: response.data.location || "",
          contactNumber: response.data.contactNumber || "",
          role: response.data.role,
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");

    if (!userId) {
      console.error("No user ID found in localStorage");
      return;
    }

    try {
      // Send PUT request to update the user profile
      const response = await api.put(
        `/api/auth/${userId}`,
        formData
      );

      console.log("Profile updated successfully:", response.data);
      setProfile(response.data); // Update the profile state with the new data
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-pink-400 to-red-500 flex justify-center items-center">
      <div className="bg-white bg-opacity-90 w-96 p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-6">
          Your Profile
        </h1>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-4 text-gray-800">
            <div>
              <label className="font-semibold">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Blood Type:</label>
              <input
                type="text"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Contact:</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Role:</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                disabled
                className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-200"
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                className="w-1/2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-1/2 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-gray-800">
            <p>
              <span className="font-semibold">Name:</span> {profile?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {profile?.email}
            </p>
            <p>
              <span className="font-semibold">Blood Type:</span>{" "}
              {profile?.bloodType || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {profile?.location}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {profile?.contactNumber}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {profile?.role}
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
