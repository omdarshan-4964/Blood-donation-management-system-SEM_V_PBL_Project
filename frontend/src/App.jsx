import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Profile from "./component/Profile";
import MainPage from "./component/mainPage";
import BloodRequestPage from "./component/BloodRequestPage";
import DonorDashboard from "./component/donorDashboard";
import MyHistoryPage from "./component/MyHistoryPage";
import HospitalDashboard from "./component/hospitalDashboardPage";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./component/adminDashboard";
import UpdateHistory from "./component/updateHistoryPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/mainPage" element={<MainPage />} />
        <Route exact path="/bloodRequestPage" element={<BloodRequestPage />} />
        <Route exact path="/donorDashboard" element={<DonorDashboard />} />
        <Route exact path="/my-history" element={<MyHistoryPage />} />
        <Route exact path="/update-history" element={<UpdateHistory />} />
        <Route exact path="/hospitalDashboard" element={<HospitalDashboard />} />
        <Route exact path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
