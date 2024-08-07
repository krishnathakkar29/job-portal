import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";
import Navbar from "./components/shared/Navbar";
import { Routes, Route } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/description/:id" element={<JobDescription />} />
      </Routes>
    </>
  );
}

export default App;
