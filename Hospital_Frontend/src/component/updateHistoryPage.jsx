import { useState } from 'react';
import axios from 'axios';

const UpdateHistory = () => {
  const [formData, setFormData] = useState({
    bloodRequestId: '',
    hospitalId: '',
    unitsDonated: '',
    dateOfDonation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/hospital/6734e2140fdc2582dd26eb4d/update-donation-history', formData);
      alert('History updated successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error updating history:', error);
      alert('Failed to update history.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Update History</h2>

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
            required
          />
        </div>

        <div>
          <label htmlFor="hospitalId" className="block text-gray-700">
            Hospital ID
          </label>
          <input
            type="text"
            id="hospitalId"
            name="hospitalId"
            value={formData.hospitalId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            required
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
