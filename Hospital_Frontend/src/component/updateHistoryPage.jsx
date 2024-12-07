import { useState, useEffect } from "react";
import {  useNavigate , useLocation} from "react-router-dom";
import axios from "axios";

const UpdateHistory = () => {
  const location = useLocation();
  const { requestId } = location.state || {}; // Use default destructuring for safety
  // const [donorId, updateDonorId] = useState("");



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
        const response = await fetch("http://localhost:5000/api/v1/blood-requests/?id="+requestId);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
       // alert(result); // Set the fetched 
          let op=result.filter((ele)=>{
            return ele._id===requestId;
          })        

          // alert(JSON.stringify(op)+"==--------------"+JSON.stringify(op[0].hospital))
          // updateDonorId(op[0].acceptedBy)
          // alert(op[0].acceptedBy)
        setFormData((prevData) => ({
          ...prevData,
          hospitalId:op[0].hospital.name,
          bloodRequestId: op[0]._id,
          unitsDonated: op[0].unitsNeeded,
        }));
      } catch (err) {
        alert(err.message); // Handle any errors
      } finally {
        alert(false); // End the loading state
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
      await axios.put(
        `http://localhost:5000/api/hospital/${formData.donorId}/update-donation-history`,
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


// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateHistoryPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { request } = location.state || {};

//   const [donationDetails, setDonationDetails] = useState({
//     hospitalId: request.hospitalId,
//     bloodRequestId: request._id,
//     donorId: request.acceptedBy,
//     dateOfDonation: "",
//     unitsDonated: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDonationDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `http://localhost:5000/api/hospital/${donationDetails.donorId}/update-donation-history`,
//         donationDetails
//       );
//       alert("Donation history updated successfully!");
//       navigate("/hospitalDashboard");
//     } catch (error) {
//       console.error("Error updating donation history:", error);
//       alert("Failed to update donation history.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-6">Update Donation History</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">
//               Date of Donation
//             </label>
//             <input
//               type="date"
//               name="dateOfDonation"
//               value={donationDetails.dateOfDonation}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">
//               Units Donated
//             </label>
//             <input
//               type="number"
//               name="unitsDonated"
//               value={donationDetails.unitsDonated}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
//           >
//             Update History
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateHistoryPage;


