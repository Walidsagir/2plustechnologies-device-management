import React from "react";
import { useNavigate } from "react-router-dom";

function AgentsEnrollmentReportCard({ name, agent, totalEnrollments }) {
  const initials = name ? name.charAt(0) : null;
  const navigate = useNavigate();

  const handleViewClick = () => {
    // Navigate to the agent's detail page using the agent's ID
    navigate(`/Agent`);
  };
  return (
    <div className="agents-enrollment-report">
      <p>{initials ? initials : "UK"}</p>
      <div className="agents-enrollment-report-card-name">
        <span className="agent-enrollment-card-label">Name</span>
        {name}
      </div>
      <div className="agents-enrollment-report-card-total-enrollments">
        <span className="agent-enrollment-card-label">Total Enrollments</span>
        {totalEnrollments}
      </div>

      <p className="agents-enrollment-report-card-">
        <span className="agent-enrollment-card-label">Date</span>
        {new Date().toLocaleDateString()}
      </p>
      <button type="button" onClick={handleViewClick}>
        View
      </button>
    </div>
  );
}

export default AgentsEnrollmentReportCard;
