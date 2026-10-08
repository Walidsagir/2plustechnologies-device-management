import React from "react";
import { useNavigate } from "react-router-dom";

function AgentsEnrollmentReportCard({ name, agent, totalEnrollments }) {
  const initials = name ? name.charAt(0) : null;
  const navigate = useNavigate();

  const handleViewClick = () => {
    // Navigate to the agent's detail page using the agent's ID
    navigate(`/agent-view`, { state: agent.id });
  };
  return (
    <div className="agents-enrollment-report">
      <p>{initials ? initials : "UK"}</p>
      <div className="agents-enrollment-report-card-name">
        <div className="agent-enrollment-report-card-details">
          <span className="agent-enrollment-card-label">Name</span>
          <span>{name}</span>
        </div>
        <div className="agent-enrollment-report-card-details agents-enrollment-report-card-total-enrollments">
          <span className="agent-enrollment-card-label">Total Enrollments</span>
          <span>{totalEnrollments}</span>
        </div>
      </div>
      <div className="agent-enrollment-report-card-details agents-enrollment-report-card-date">
        <span className="agent-enrollment-card-label">Date</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <button type="button" onClick={handleViewClick}>
        View
      </button>
    </div>
  );
}

export default AgentsEnrollmentReportCard;
