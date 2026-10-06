import "./App.css";
import HeaderSection from "./components/header-section";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AggregatorDashboard from "./pages/aggregator-dashboard";
import AgentsEnrollmentReportCard from "./components/agents-enrollment-report";
import AgentsDetailsPage from "./pages/agents-details-page";
import AgentAggregatorDescriptionCard from "./components/agent-aggregrator-description-card";
import ViewAgentAggregatorPage from "./pages/agent-aggregrator-view-tab";

const Home = () => <div>Home Page </div>;
const Agents = () => <div>Agents Management</div>;
const Technicians = () => <div>Technicians Portal</div>;
const Aggregators = () => <div>Aggregators Panel</div>;
const Devices = () => <div>Devices Inventory</div>;
const Tickets = () => <div>Support Tickets</div>;
const Profile = () => <div>User Profile</div>;
const Settings = () => <div>Account Settings</div>;
const Agent = () => <div>Agent</div>;

function App() {
  const demoAgent = {
    name: "Falid Sagir",
    status: "Active",
    phone: "0803 000 0001",
    devices: 3,
    email: "falid.sagir@gmail.com",
    bank: "Bank of America",
    accountName: "Savings Account",
    accountNumber: "1234567890",
    joined: "2023-01-01",
    device: {
      id: "NIMC-1",
      model: "Cumbo",
      status: "Assigned",
      imei: "356938035643809",
      lastSync: "Today, 9:12 AM",
      assignedSince: "12 Mar 2026",
    },
  };

  return (
    <Router>
      <main className="app-shell">
        <div className="main-content agent-aggregator-view-main-content">
          <HeaderSection
            name="Walid Sagir"
            metadata="Welcome back!"
            role="aggregators"
          />
          {/* Add your routes here */}
          {/*<Routes>
            <Route
              path="/"
              element={
                <>
                  <AggregatorDashboard />
                  <Home />
                </>
              }
            />
            <Route path="/agents" element={<AgentsDetailsPage />} />
            <Route path="/technicians" element={<Technicians />} />
            <Route path="/aggregators" element={<Aggregators />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>*/}
          <ViewAgentAggregatorPage agent={demoAgent} />
        </div>
      </main>
    </Router>
  );
}

export default App;
