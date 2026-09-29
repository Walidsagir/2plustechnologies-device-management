function AggregatorTargetBox({ target, achieved, dateline }) {
  const enrollmentsRemaining = Math.max(target - achieved, 0);
  const daysRemaining = Math.max(
    0,
    Math.ceil((new Date(dateline) - new Date()) / (1000 * 60 * 60 * 24)),
  );
  const percentage =
    target > 0 ? Math.min(Math.max((achieved / target) * 100, 0), 100) : 0;
  const dailyPace =
    daysRemaining > 0 ? Math.ceil(enrollmentsRemaining / daysRemaining) : 0;

  return (
    <section className="aggregator-target-box" aria-labelledby="target-title">
      <div className="target-info">
        <h2 className="target-title" id="target-title">
          Current target
        </h2>
        <span className="target-status">On track</span>
      </div>
      <div className="target-values">
        <div className="target-amounts">
          <span className="achieved-value">{achieved.toLocaleString()}</span>
          <span className="target-value">/ {target.toLocaleString()}</span>
        </div>
        <span className="target-percentage">{Math.round(percentage)}%</span>
      </div>
      <div
        className="target-progress"
        role="progressbar"
        aria-label="Current target progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percentage)}
      >
        <span style={{ width: `${percentage}%` }} />
      </div>
      <div className="target-footer">
        <span className="remaining-enrollments">
          {enrollmentsRemaining.toLocaleString()} to go
        </span>
        <span className="remaining-days">
          {daysRemaining} days left - {dailyPace.toLocaleString()}/day
        </span>
      </div>
    </section>
  );
}

export default AggregatorTargetBox;
