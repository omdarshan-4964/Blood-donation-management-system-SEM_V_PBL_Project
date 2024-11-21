// import { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'Donor',
//     bloodType: '',
//     location: '',
//     contactNumber: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', formData);
//       setSuccess(response.data.message);
//       setFormData({
//         name: '',
//         email: '',
//         password: '',
//         role: 'Donor',
//         bloodType: '',
//         location: '',
//         contactNumber: '',
//       });
//     } catch (err) {
//       setError(err.response?.data?.error || 'An error occurred');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//               Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="Donor">Donor</option>
//               <option value="Hospital">Hospital</option>
//             </select>
//           </div>
//           {formData.role === 'Donor' && (
//             <div>
//               <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
//                 Blood Type
//               </label>
//               <input
//                 type="text"
//                 id="bloodType"
//                 name="bloodType"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 value={formData.bloodType}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}
//           <div>
//             <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//               Location
//             </label>
//             <input
//               type="text"
//               id="location"
//               name="location"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={formData.location}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
//               Contact Number
//             </label>
//             <input
//               type="text"
//               id="contactNumber"
//               name="contactNumber"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Donor',
    bloodType: '',
    location: '',
    contactNumber: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setSuccess(response.data.message);

      // Reset form after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'Donor',
        bloodType: '',
        location: '',
        contactNumber: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  // Navigate to login page after successful registration
  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <div className="max-w-screen-xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/600x600)' }}>
          {/* Image is placed here; adjust the URL for actual images */}
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && (
            <div>
              <p className="text-green-500 text-sm mb-4">{success}</p>
              {/* Login Button after success */}
              <button
                onClick={handleLoginRedirect}
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Go to Login
              </button>
            </div>
          )}

          {/* Registration Form */}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="Donor">Donor</option>
                  <option value="Hospital">Hospital</option>
                </select>
              </div>
              {formData.role === 'Donor' && (
                <div>
                  <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                    Blood Type
                  </label>
                  <input
                    type="text"
                    id="bloodType"
                    name="bloodType"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.bloodType}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Register
              </button>
            </form>
          )}
          
          {/* Already Registered Link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already registered?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-indigo-500 hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
