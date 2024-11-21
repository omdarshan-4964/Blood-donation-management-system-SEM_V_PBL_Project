import axios from 'axios';

// Function to fetch and store blood requests in localStorage
export const fetchAndStoreBloodRequests = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/blood-requests');
    localStorage.setItem('bloodRequests', JSON.stringify(response.data)); // Store in localStorage
  } catch (error) {
    console.error('Error fetching blood requests:', error);
  }
};
