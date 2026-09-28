import "./App.css";
import HeaderSection from "./components/header-section";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AggrigatorDashboard from "./pages/aggregator-dashboard";

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
    <Router>
      <main className="app-shell">
        <div className="main-content">
          <HeaderSection
            name="Walid Sagir"
            metadata="Welcome back!"
            role="aggregators"
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AggrigatorDashboard />
                  <Home />
                </>
              }
            />
            <Route path="/agents" element={<Agents />} />
            <Route path="/technicians" element={<Technicians />} />
            <Route path="/aggregators" element={<Aggregators />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
