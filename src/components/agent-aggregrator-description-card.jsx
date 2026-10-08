import { useLocation } from "react-router-dom";

function AgentAggregatorDescriptionCard() {
  const user = useLocation().state;
  const initials = user.name ? user.name.charAt(0) : null;
  const name = user.name ? user.name : "Unknown";
  const phone = user.phone ? user.phone : "Unknown";
  const status = user.status ? user.status : "Unknown";
  const devices = user.devices ? user.devices : "Unknown";
  const enrollments = user.enrollments ? user.enrollments : "Unknown";

  return (
    <div className="agent-aggregator-description-card">
      <div className="agent-aggregator-description-card-mobile-layout">
        <div className="agent-aggregator-description-card-first-row">
          <span className="agent-aggregator-description-card-initials">
            {initials ? initials : "UK"}
          </span>
          <div className="agent-aggregator-description-card-details">
            <div className="agent-aggregator-description-card-heading">
              <div className="agent-aggregator-description-card-name">
                {name}
              </div>
              <div className="agent-aggregator-description-card-status">
                {status}
              </div>
            </div>
            <div className="agent-aggregator-description-card-contact">
              <div className="agent-aggregator-description-card-phone">
                <i className="fas fa-phone" aria-hidden="true"></i>
                <span>{phone}</span>
              </div>
              <span
                className="agent-aggregator-description-card-separator"
                aria-hidden="true"
              >
                ·
              </span>
              <div className="agent-aggregator-description-card-devices">
                {devices} <span>devices</span>
              </div>
            </div>
          </div>
        </div>

        <div className="agent-aggregator-description-card-second-row">
          <div className="agent-aggregator-description-card-enrollments">
            <span>Enrollments</span>
            <span className="agent-aggregator-description-card-enrollments-value">
              {enrollments}
            </span>
          </div>
          <button
            type="button"
            className="agent-aggregator-description-card-enrollments-button"
          >
            View
          </button>
        </div>
      </div>

      <div className="agent-aggregator-description-card-desktop-layout">
        <div className="agent-aggregator-description-card-desktop-agent">
          <span className="agent-aggregator-description-card-desktop-initials">
            {initials ? initials : "UK"}
          </span>
          <span className="agent-aggregator-description-card-desktop-name">
            {name}
          </span>
          <span className="agent-aggregator-description-card-desktop-status">
            {status}
          </span>
        </div>
        <span className="agent-aggregator-description-card-desktop-phone">
          {phone}
        </span>
        <span className="agent-aggregator-description-card-desktop-devices">
          {devices}
        </span>
        <span className="agent-aggregator-description-card-desktop-enrollments">
          {enrollments}
        </span>
        <button
          type="button"
          className="agent-aggregator-description-card-enrollments-button"
        >
          View
        </button>
      </div>
    </div>
  );
}
export default AgentAggregatorDescriptionCard;
