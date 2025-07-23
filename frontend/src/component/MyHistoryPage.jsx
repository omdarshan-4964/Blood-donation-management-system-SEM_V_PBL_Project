import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import api from '../api/axios';

const MyHistoryPage = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const donorId = localStorage.getItem("id"); // Fetch from localStorage or context
  console.log(donorId);
  console.log(donationHistory);

 const navigate = useNavigate();

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const response = await api.get(`/api/hospital/${donorId}/donation-history`);
        setDonationHistory(response.data.donationHistory);
      } catch (error) {
        console.error("Error fetching donation history:", error);
      }
    };

    fetchDonationHistory();
  }, [donorId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold">My Donation History</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => navigate("/donorDashboard")}
        >
          Back to Dashboard
        </button>
      </header>

      <main className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {donationHistory.length > 0 ? (
            <div className="space-y-4">
              {donationHistory.map((history) => (
                <div key={history._id} className="p-4 border-b">
                  <p><strong>Blood Request ID:</strong> {history.bloodRequestId}</p>
                  <p><strong>Units Donated:</strong> {history.unitsDonated}</p>
                  <p><strong>Date of Donation:</strong> {new Date(history.dateOfDonation).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No donation history found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyHistoryPage;



