function AnalyticsCard({ title, value, icon, footerInfo }) {
  return (
    <div className="analytics-card card">
      <div className="analytics-card-icon-title ">
        <span className="analytics-card-icon icon-btn">
          <i className={`fa-solid fa-${icon}`}></i>
        </span>
        <span className="analytics-card-title sub">{title}</span>
      </div>
      <div>
        <div className="analytics-card-content">
          <h3 className="analytics-card-value value">{value}</h3>
          <p className="analytics-card-footer-info">{footerInfo}</p>
        </div>
        <div className="analytics-card-trend">{/* Trend indicator */}</div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
