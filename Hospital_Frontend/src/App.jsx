import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
// import Navbar from "./component/Navbar";
import Profile from "./component/Profile";
import MainPage from "./component/mainPage";
import BloodRequestPage from "./component/BloodRequestPage";
import DonorDashboard from "./component/donorDashboard";
import MyHistoryPage from "./component/MyHistoryPage";
import HospitalDashboard from "./component/hospitalDashboard";
import UpdateDonationHistory from "./component/donationHistoryPage";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./component/adminDashboard";
import UpdateHistory from "./component/updateHistoryPage";




function App() {
  return (
    <>
    {/* <Navbar></Navbar> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/mainPage" element={<MainPage />} />
        <Route exact path="/bloodRequestPage" element={<BloodRequestPage />} />
        <Route exact path="/donorDashboard" element={<DonorDashboard />} />
        <Route exact path="/my-history" element={<MyHistoryPage />} />
        <Route exact path="/updateHistory" element={<UpdateHistory />} />
        <Route exact path="/hospitalDashboard" element={<HospitalDashboard />} />
        <Route exact path="/adminDashboard" element={<AdminDashboard />} />
        <Route exact path="/updateDonationHistory" element={<UpdateDonationHistory />} />
      </Routes>
    </>
  );
}

export default App;
