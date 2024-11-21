import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);

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
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            id: userId // Add userId as a custom header
          }
        });
        
        console.log(response.data);
        setProfile(response.data); // Set the profile data

      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-96 p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
        {profile ? (
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Name:</span> {profile.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {profile.email}
            </p>
            <p>
              <span className="font-semibold">Blood Type:</span> {profile.bloodType || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {profile.location}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {profile.contactNumber}
            </p>
            <p>
              <span className="font-semibold">Role:</span> {profile.role}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
