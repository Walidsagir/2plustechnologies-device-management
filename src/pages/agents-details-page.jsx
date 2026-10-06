import AgentAggregatorDescriptionCard from "../components/agent-aggregrator-description-card";
import { useState } from "react";

function AgentsDetailsPage() {
  const userData = [
    {
      id: 1,
      name: "mohamed sani",
      status: "Inactive",
      enrollments: 1000,
      phone: "123-456-7890",
      devices: 3,
    },
    {
      id: 2,
      name: "Jennifer Smith",
      status: "Active",
      enrollments: 30050,
      phone: "123-456-7890",
      devices: 30,
    },
    {
      id: 3,
      name: "mohamed sani",
      status: "Active",
      enrollments: 10,
      phone: "123-456-7890",
      devices: 3,
    },
    {
      id: 4,
      name: "mohamed sani",
      status: "Active",
      enrollments: 10,
      phone: "123-456-7890",
      devices: 3,
    },
    {
      id: 5,
      name: "John Doe",
      status: "Inactive",
      enrollments: 10850,
      phone: "123-456-7890",
      devices: 5,
    },
  ];
  const [userFilteredData, setFilteredUserData] = useState(userData);
  const [filteredBy, setFilteredBy] = useState("all");

  const handleFilter = (value) => {
    const filtered = userData.filter(
      (user) => user.status.toLowerCase() === value,
    );
    if (value === "all") {
      setFilteredUserData(userData);
      setFilteredBy("all");
      return;
    }
    setFilteredUserData(filtered);
    setFilteredBy(value);
  };
  {
    /* Search and filter logic */
  }
  const handleSearch = (value) => {
    const filtered = userData.filter((user) => {
      const searchbleFields = [user.name, user.phone, user.status, user.email];

      return searchbleFields.some((field) => {
        if (!field) return false;
        return field.toLowerCase().includes(value.toLowerCase());
      });
    });
    setFilteredUserData(filtered);
  };

  return (
    <div className="agents-details-page">
      <p className="agents-page-summary">22 agents · 18 working today</p>
      <div className="agents-controls-row">
        <button type="button" className="agents-add-button">
          <i className="fas fa-user-plus" aria-hidden="true"></i> Add agent
        </button>

        <div className="search-filter-row">
          <div className="search-filter-row-search-box">
            <span aria-hidden="true">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              aria-label="Search agents"
              placeholder="Search agents"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="search-filter-row-sort">
            <span aria-hidden="true">
              <i className="fas fa-sliders"></i>
            </span>
            <span className="search-filter-row-sort-label" aria-hidden="true">
              Filter
            </span>
            <select
              aria-label="Filter agents"
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      <div className="agents-list-container">
        <div className="agents-list-container-header">
          <span className="agents-list-container-title">
            All agents <span>(22)</span>
          </span>
          <span className="agents-list-container-sorted">
            Filtered by {filteredBy ? filteredBy : "all"}
          </span>
        </div>
        <div className="agents-list">
          {userFilteredData.map((user, index) => (
            <AgentAggregatorDescriptionCard key={index} agent={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgentsDetailsPage;
