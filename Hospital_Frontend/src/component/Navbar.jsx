import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <div>
        {/* Navbar */}
        <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">LifeLink</h1>
          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/adminDashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Admin
            </NavLink>
            <NavLink
              to="/mainPage"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Main
            </NavLink>
            <NavLink
              to="/bloodRequestPage"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Blood Requests
            </NavLink>
            <NavLink
              to="/donorDashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Donor Dashboard
            </NavLink>
            <NavLink
              to="/hospitalDashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Hospital Dashboard
            </NavLink>
            <NavLink
              to="/myHistory"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              My History
            </NavLink>
            <NavLink
              to="/updateDonationHistory"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
              }
            >
              Update History
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  )
}
