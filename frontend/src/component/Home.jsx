
import Login from './Login';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 flex items-center justify-center">
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section with Image */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-4xl font-bold text-blue-600 text-center">
            LifeLink - Blood Donation Management System
          </h1>
          <p className="text-gray-700 text-center">
            Join our mission to save lives by connecting hospitals with blood donors directly. 
            Every drop counts!
          </p>
          <img
            src="/images/BDMS6.jpg"
            alt="Blood Donation Banner"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section with Login */}
        <div className="bg-white shadow-lg rounded-lg">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Home;
