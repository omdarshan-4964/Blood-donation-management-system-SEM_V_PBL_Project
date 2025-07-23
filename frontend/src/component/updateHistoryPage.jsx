import { useState, useEffect } from "react";
import {  useNavigate , useLocation} from "react-router-dom";
import api from '../api/axios';

const UpdateHistory = () => {
  const location = useLocation();
  const { requestId } = location.state || {}; 

  const [formData, setFormData] = useState({
    hospitalId: "",
    bloodRequestId: "",
    dateOfDonation: "",
    unitsDonated: "",
    donorId: requestId.acceptedBy,
  });

  const navigate = useNavigate();

  useEffect(() => {
  
    const fetchRequestDetails = async () => {

  try {
          const response = await api.get("/api/v1/blood-requests/", {
              params: {
                id: requestId
              }
            });
            setFormData((prevData) => ({
          ...prevData,
          hospitalId:op[0].hospital.name,
          bloodRequestId: op[0]._id,
          unitsDonated: op[0].unitsNeeded,
        }));
      } catch (err) {
        alert(err.message); 
      } finally {
        alert(false); 
      }
    };

    if (requestId) {
      fetchRequestDetails();
    }
  }, [requestId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/api/hospital/${formData.donorId}/update-donation-history`,
        formData
      );
      alert("Donation history updated successfully!");
      navigate("/hospitalDashboard"); 
    } catch (error) {
      console.error("Error updating donation history:", error);
      alert("Failed to update donation history.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <p>Request ID: {requestId}</p>
        <h2 className="text-xl font-bold text-center"> Update Donation History</h2>

        <div>
          <label htmlFor="hospitalId" className="block text-gray-700">
            Hospital Name 
          </label>
          <input
            type="text"
            id="hospitalId"
            name="hospitalId"
            value={formData.hospitalId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            readOnly
          />
        </div>

        <div>
          <label htmlFor="bloodRequestId" className="block text-gray-700">
            Blood Request ID
          </label>
          <input
            type="text"
            id="bloodRequestId"
            name="bloodRequestId"
            value={formData.bloodRequestId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            readOnly
          />
        </div>

        <div>
          <label htmlFor="unitsDonated" className="block text-gray-700">
            Units Donated
          </label>
          <input
            type="number"
            id="unitsDonated"
            name="unitsDonated"
            value={formData.unitsDonated}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="dateOfDonation" className="block text-gray-700">
            Date of Donation
          </label>
          <input
            type="date"
            id="dateOfDonation"
            name="dateOfDonation"
            value={formData.dateOfDonation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateHistory;