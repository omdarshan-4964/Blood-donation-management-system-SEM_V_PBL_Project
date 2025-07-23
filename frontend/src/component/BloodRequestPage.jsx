
import { useState } from 'react';
import axios from 'axios';

const BloodRequestForm = () => {
    const [hospitalId, setHospitalId] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [location, setLocation] = useState('');
    const [unitsNeeded, setUnitsNeeded] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/blood-requests', 
                {
                    hospitalId,
                    bloodType,
                    location,
                    unitsNeeded
                }
            );
            setMessage(response.data.message);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setMessage('Error creating blood request');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-red-500 via-pink-400 to-red-500 flex items-center justify-center">
            <div className="max-w-lg mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-red-600">Create a Blood Request</h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="hospitalId">
                            Hospital ID
                        </label>
                        <input
                            type="text"
                            id="hospitalId"
                            value={hospitalId}
                            onChange={(e) => setHospitalId(e.target.value)}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="bloodType">
                            Blood Type
                        </label>
                        <select
                            id="bloodType"
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        >
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="location">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="unitsNeeded">
                            Units Needed
                        </label>
                        <input
                            type="number"
                            id="unitsNeeded"
                            value={unitsNeeded}
                            onChange={(e) => setUnitsNeeded(e.target.value)}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {loading ? 'Sending Request...' : 'Send Blood Request'}
                        </button>
                    </div>

                    {message && (
                        <div className="mt-4 text-center">
                            <p className="text-sm font-semibold text-gray-700">{message}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default BloodRequestForm;
