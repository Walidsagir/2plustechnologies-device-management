import React from "react";

function ViewAgentAggregatorPage({ agent }) {
  const device = agent.device ?? {};
  const labels = [
    { label: "Phone", value: agent.phone },
    { label: "Email", value: agent.email },
    { label: "Bank", value: agent.bank },
    { label: "Account name", value: agent.accountName },
    { label: "Account number", value: agent.accountNumber },
    { label: "Devices", value: `${agent.devices} assigned` },
    { label: "Joined", value: agent.joined },
  ];
  const initials = agent.name.charAt(0).toUpperCase();
  const [selectedPeriod, setSelectedPeriod] = React.useState("this-month");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  });
  const [monthView, setMonthView] = React.useState("this-month");

  const MOCK_AGENT_REPORTS_DATABASE = {
    agent_id: 99,
    agent_name: "Chidi Okafor",
    state: "Enugu State",
    zone: "South East",
    last_sync_at: "2026-10-06T06:29:00.000Z",

    enrollments: [
      // --- OCTOBER 2026 (Current Month) ---
      {
        id: 901,
        report_title: "Nsukka Urban Verification",
        created_at: "2026-10-05",
        total_enrollments: 45,
        status: "APPROVED",
      },
      {
        id: 902,
        report_title: "Enugu Campus Student Drive",
        created_at: "2026-10-05",
        total_enrollments: 112,
        status: "APPROVED",
      },
      {
        id: 903,
        report_title: "Ogbete Main Market Rollout",
        created_at: "2026-10-02",
        total_enrollments: 89,
        status: "APPROVED",
      },

      // --- SEPTEMBER 2026 (1 Month Ago) ---
      {
        id: 855,
        report_title: "Awgu LGA Farmer Onboarding",
        created_at: "2026-09-28",
        total_enrollments: 165,
        status: "APPROVED",
      },
      {
        id: 812,
        report_title: "Udi Community Biometrics",
        created_at: "2026-09-15",
        total_enrollments: 74,
        status: "APPROVED",
      },

      // --- AUGUST 2026 (2 Months Ago) ---
      {
        id: 790,
        report_title: "Nkanu West Cooperatives",
        created_at: "2026-08-11",
        total_enrollments: 92,
        status: "APPROVED",
      },

      // --- MAY 2026 (5 Months Ago) ---
      {
        id: 420,
        report_title: "Garriki Market Pilot Phase",
        created_at: "2026-05-20",
        total_enrollments: 230,
        status: "APPROVED",
      },

      // --- MARCH 2026 (7 Months Ago) ---
      {
        id: 215,
        report_title: "Ezeagu LGA Rural Assessment",
        created_at: "2026-03-04",
        total_enrollments: 115,
        status: "APPROVED",
      },

      // --- FEBRUARY 2026 (8 Months Ago) ---
      {
        id: 104,
        report_title: "Nsukka Cluster Baseline Setup",
        created_at: "2026-02-18",
        total_enrollments: 198,
        status: "APPROVED",
      }, // Add this inside your mock enrollments array to test it:
      {
        id: 999,
        report_title: "Testing Today's Filter",
        created_at: "2026-10-06", // Matches today's date!
        total_enrollments: 50,
        status: "APPROVED",
      },
    ],
  };

  const getEnrollmentsInRange = (start, end) =>
    MOCK_AGENT_REPORTS_DATABASE.enrollments.filter(
      (enrollment) =>
        enrollment.created_at >= start && enrollment.created_at <= end,
    );

  const today = new Date();

  const firstDayObj = new Date(today.getFullYear(), today.getMonth(), 1);

  const firstDayOfMonth = `${firstDayObj.getFullYear()}-${String(firstDayObj.getMonth() + 1).padStart(2, "0")}-01`;

  const lastDayObj = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const lastDayOfMonth = `${lastDayObj.getFullYear()}-${String(lastDayObj.getMonth() + 1).padStart(2, "0")}-${String(lastDayObj.getDate()).padStart(2, "0")}`;

  const formatDateRange = (start, end) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [startYear, startMonth, startDay] = start.split("-").map(Number);
    const [endYear, endMonth, endDay] = end.split("-").map(Number);
    const endMonthYear = `${months[endMonth - 1]} ${endYear}`;

    if (startYear === endYear && startMonth === endMonth) {
      return `${startDay} – ${endDay} ${endMonthYear}`;
    }

    const startLabel =
      startYear === endYear
        ? `${startDay} ${months[startMonth - 1]}`
        : `${startDay} ${months[startMonth - 1]} ${startYear}`;

    return `${startLabel} – ${endDay} ${endMonthYear}`;
  };

  const [dateRange, setDateRange] = React.useState(() =>
    formatDateRange(firstDayOfMonth, lastDayOfMonth),
  );
  const [enrollmentCount, setEnrollmentCount] = React.useState(() =>
    getEnrollmentsInRange(firstDayOfMonth, lastDayOfMonth).reduce(
      (total, enrollment) => total + enrollment.total_enrollments,
      0,
    ),
  );

  const handleThisMonthClick = () => {
    setSelectedPeriod("this-month");
    setMonthView("this-month");
    setDateRange(formatDateRange(firstDayOfMonth, lastDayOfMonth));
    const monthEnrollments = getEnrollmentsInRange(
      firstDayOfMonth,
      lastDayOfMonth,
    );

    setEnrollmentCount(
      monthEnrollments.reduce(
        (total, enrollment) => total + enrollment.total_enrollments,
        0,
      ),
    );
  };

  const handleSixMonthsClick = () => {
    setSelectedPeriod("six-months");
    setMonthView("six-months");
    const startObj = new Date(today.getFullYear(), today.getMonth() - 5, 1);
    const startOfSixMonths = `${startObj.getFullYear()}-${String(startObj.getMonth() + 1).padStart(2, "0")}-01`;
    const endObj = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const endOfSixMonths = `${endObj.getFullYear()}-${String(endObj.getMonth() + 1).padStart(2, "0")}-${String(endObj.getDate()).padStart(2, "0")}`;
    setDateRange(formatDateRange(startOfSixMonths, endOfSixMonths));

    const sixMonthsEnrollments = getEnrollmentsInRange(
      startOfSixMonths,
      endOfSixMonths,
    );

    setEnrollmentCount(
      sixMonthsEnrollments.reduce(
        (total, enrollment) => total + enrollment.total_enrollments,
        0,
      ),
    );
  };

  const handleCustomClick = (start, end) => {
    if (!start || start > end) return;

    const customEnrollments = getEnrollmentsInRange(start, end);

    setSelectedPeriod("custom");
    setMonthView("custom");
    setDateRange(formatDateRange(start, end));
    setEnrollmentCount(
      customEnrollments.reduce(
        (total, enrollment) => total + enrollment.total_enrollments,
        0,
      ),
    );
  };

  const handleTodayClick = () => {
    setSelectedPeriod("today");
    setMonthView("today");
    const todayObj = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const startOfToday = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, "0")}-${String(todayObj.getDate()).padStart(2, "0")}`;

    const todayEnrollments = getEnrollmentsInRange(startOfToday, startOfToday);
    setDateRange(formatDateRange(startOfToday, startOfToday));

    setEnrollmentCount(
      todayEnrollments.reduce(
        (total, enrollment) => total + enrollment.total_enrollments,
        0,
      ),
    );
  };

  const lastSyncTime = (() => {
    const lastSync = MOCK_AGENT_REPORTS_DATABASE.last_sync_at;
    if (!lastSync) return "No enrollments yet";
    const sync = new Date(lastSync).getTime();
    const now = new Date().getTime();
    const diff = now - sync;
    const diffInSeconds = Math.floor(diff / 1000);
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  })();
  const lastSyncDate = MOCK_AGENT_REPORTS_DATABASE.last_sync_at
    ? new Date(MOCK_AGENT_REPORTS_DATABASE.last_sync_at).toLocaleDateString()
    : "No enrollments yet";

  const periods = [
    { id: "today", label: "Today" },
    { id: "this-month", label: "This month" },
    { id: "six-months", label: "6 months" },
    { id: "custom", label: "Custom" },
  ];

  return (
    <div className="agent-aggregator-view-page">
      <section
        className="agent-aggregator-view-card-description"
        aria-label={`${agent.name} details`}
      >
        <header className="agent-aggregator-view-card-description-header">
          <span className="agent-aggregator-view-card-description-initials">
            {initials}
          </span>
          <div className="agent-aggregator-view-card-description-header-text">
            <h2 className="agent-aggregator-view-card-description-name">
              {agent.name}
            </h2>
            <span className="agent-aggregator-view-card-description-status">
              {agent.status}
            </span>
          </div>
        </header>

        <div className="agent-aggregator-view-card-description-content">
          {labels.map(({ label, value }) => (
            <div
              className="agent-aggregator-view-card-description-row"
              key={label}
            >
              <span className="agent-aggregator-view-card-description-label">
                {label}
              </span>
              <span className="agent-aggregator-view-card-description-value">
                {value}
                {label === "Account number" && (
                  <i className="far fa-copy" aria-hidden="true"></i>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section
        className="agent-aggregator-view-card-enrollments"
        aria-label="Enrollment summary"
      >
        <h2 className="agent-aggregator-view-card-enrollments-header">
          Enrollments
        </h2>
        <div
          className="agent-aggregator-view-card-enrollments-buttons"
          role="group"
          aria-label="Enrollment date range"
        >
          {periods.map(({ id, label }) => (
            <button
              className={`agent-aggregator-view-card-enrollments-button${
                selectedPeriod === id ? " is-active" : ""
              }`}
              key={id}
              type="button"
              aria-pressed={selectedPeriod === id}
              onClick={() =>
                id === "this-month"
                  ? handleThisMonthClick() && setSelectedPeriod(id)
                  : id === "six-months"
                    ? handleSixMonthsClick() && setSelectedPeriod(id)
                    : id === "custom"
                      ? setSelectedPeriod(id)
                      : id === "today"
                        ? handleTodayClick() && setSelectedPeriod(id)
                        : null
              }
            >
              {label}
            </button>
          ))}
        </div>
        {selectedPeriod === "custom" && (
          <div className="agent-aggregator-view-card-enrollments-custom-date-range">
            <label>
              <span>From</span>
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </label>
            <label>
              <span>To</span>
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </label>
            <button
              className="agent-aggregator-view-card-enrollments-button is-active"
              type="button"
              onClick={() => handleCustomClick(startDate, endDate)}
              disabled={!startDate || !endDate || startDate > endDate}
            >
              Apply
            </button>
          </div>
        )}
        <div className="agent-aggregator-view-card-enrollments-stats">
          <span className="agent-aggregator-view-card-enrollments-stats-label">
            Total enrollments
          </span>
          <span className="agent-aggregator-view-card-enrollments-stats-value">
            {selectedPeriod === monthView
              ? enrollmentCount
              : selectedPeriod === monthView
                ? enrollmentCount
                : 0}
          </span>
          <span className="agent-aggregator-view-card-enrollments-stats-meta-date-range">
            {dateRange}
          </span>
        </div>
        <div
          className="agent-aggregator-view-card-last-sync-enrollment"
          role="group"
          aria-label="Last enrollment"
        >
          <span className="agent-aggregator-view-card-last-sync-enrollment-icon">
            <i className="fas fa-sync-alt"></i>
          </span>
          <div className="agent-aggregator-view-card-last-sync-enrollment-content">
            <span className="agent-aggregator-view-card-last-sync-enrollment-title">
              Last enrollment
            </span>
            <span className="agent-aggregator-view-card-last-sync-enrollment-time">
              {lastSyncTime ? lastSyncTime : "No enrollments yet"}
            </span>
          </div>
          <span className="agent-aggregator-view-card-last-sync-enrollment-date">
            {lastSyncDate ? lastSyncDate : "No enrollments yet"}
          </span>
        </div>
      </section>
      <section className="agent-aggregator-view-card-device-section">
        <h2 className="agent-aggregator-view-card-device-section-header">
          Assigned device
        </h2>
        <div className="agent-aggregator-view-card-device-section-content">
          <div className="agent-aggregator-view-card-device-identity">
            <span className="agent-aggregator-view-card-device-icon">
              <i className="fas fa-tablet-alt"></i>
            </span>
            <span className="agent-aggregator-view-card-device-identity-text">
              <strong>{device.id || "No device assigned"}</strong>
              {device.model && <span>{device.model}</span>}
            </span>
          </div>
          <div className="agent-aggregator-view-card-device-status">
            <span className="agent-aggregator-view-card-device-detail-label"></span>
            <span className="agent-aggregator-view-card-device-status-value">
              {device.status || "Unassigned"}
            </span>
          </div>
          <div className="agent-aggregator-view-card-device-detail">
            <span className="agent-aggregator-view-card-device-detail-label">
              IMEI
            </span>
            <span className="agent-aggregator-view-card-device-detail-value">
              {device.imei || "—"}
            </span>
          </div>
          <div className="agent-aggregator-view-card-device-detail">
            <span className="agent-aggregator-view-card-device-detail-label">
              Last sync
            </span>
            <span className="agent-aggregator-view-card-device-detail-value">
              {device.lastSync || "—"}
            </span>
          </div>
          <div className="agent-aggregator-view-card-device-detail agent-aggregator-view-card-device-assigned-since">
            <span className="agent-aggregator-view-card-device-detail-label">
              Assigned since
            </span>
            <span className="agent-aggregator-view-card-device-detail-value">
              {device.assignedSince || "—"}
            </span>
          </div>
          <button
            className="agent-aggregator-view-card-device-view-button"
            type="button"
            aria-label="View assigned device"
            disabled={!device.id}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>
    </div>
  );
}

export default ViewAgentAggregatorPage;
