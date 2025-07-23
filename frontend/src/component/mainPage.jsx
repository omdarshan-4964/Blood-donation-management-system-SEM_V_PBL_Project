
import { Link } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-pink-400 to-red-500 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-white bg-opacity-20 backdrop-blur-md shadow-lg">
        <div className="text-2xl font-bold tracking-wide">LifeLink</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline text-lg font-medium">
            Home
          </Link>
          <ScrollLink
            to="about-section"
            smooth={true}
            duration={500}
            className="hover:underline text-lg font-medium cursor-pointer"
          >
            About
          </ScrollLink>
          <ScrollLink
            to="contact-section"
            smooth={true}
            duration={500}
            className="hover:underline text-lg font-medium cursor-pointer"
          >
            Contact Us
          </ScrollLink>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center text-center px-5 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Save Lives, Share Blood
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl">
          Join LifeLink to connect with hospitals and donors to ensure timely blood donations. Your small contribution can make a big difference.
        </p>
        <Link
          to="/Home"
          className="mt-6 px-6 py-3 bg-white text-red-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </header>

      {/* About Section */}
      <Element name="about-section">
        <section className="px-5 py-16 bg-white text-gray-900">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">
            Why Choose LifeLink?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Real-Time Connection</h3>
              <p>Connect directly with donors and hospitals for faster blood delivery.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">User-Friendly Interface</h3>
              <p>Easily register, request, and manage blood donation activities.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Efficient Notifications</h3>
              <p>Receive timely notifications for blood requests and availability.</p>
            </div>
          </div>
        </section>
      </Element>

      {/* Contact Us Section */}
      <Element name="contact-section">
        <section className="px-5 py-16 bg-gradient-to-r from-red-400 via-pink-500 to-red-400 text-white">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">
            Contact Us
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p>support@lifelink.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p>+91 9812312312 </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p>123 Wellness Street, Gokul Shirgaon, Karvir </p> 
               <p>Kolhapur, Maharashtra, 416003</p>
            </div>
          </div>
        </section>
      </Element>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2024 LifeLink Blood Donation Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
