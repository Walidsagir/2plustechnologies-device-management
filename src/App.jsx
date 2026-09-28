import "./App.css";
import AggrigatorDashboard from "./pages/aggregator-dashboard";
import HeaderSection from "./components/header-section";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = () => <div>Home Page</div>;
const Agents = () => <div>Agents Management</div>;
const Technicians = () => <div>Technicians Portal</div>;
const Aggregators = () => <div>Aggregators Panel</div>;
const Devices = () => <div>Devices Inventory</div>;
const Tickets = () => <div>Support Tickets</div>;
const Profile = () => <div>User Profile</div>;
const Settings = () => <div>Account Settings</div>;

function App() {
  return (
    <main className="app-shell">
      <HeaderSection name="Walid Sagir" metadata="Welcome back!" />
      {/* The AggrigatorDashboard component is rendered here   <AggrigatorDashboard />*/}
      {/* The Router component wraps the entire application to enable routing */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/technicians" element={<Technicians />} />
          <Route path="/aggregators" element={<Aggregators />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
