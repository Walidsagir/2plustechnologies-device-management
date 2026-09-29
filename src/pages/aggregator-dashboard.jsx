import React from "react";
import AnalyticsCard from "../components/analytics-card";
import AgentsEnrollmentReportCard from "../components/agents-enrollment-report";
import AggregatorTargetBox from "../components/aggregator-target-box";

export default function AggregatorDashboard() {
  const enrollmenstReport = [
    {
      name: "walid sagir",
      agent: {
        name: "walid sagir",
        phone: "123-456-7890",
        email: "walid.sagir@example.com",
        accountNumber: "1234567890",
        accountName: "Walid Sagir",
        bankName: "Example Bank",
        targetEnrollments: 50,
        issue: "No issues reported",
      },
      totalEnrollments: 78,
    },
    {
      name: "john doe",
      agent: {
        name: "john doe",
        phone: "098-765-4321",
        email: "john.doe@example.com",
        accountNumber: "0987654321",
        accountName: "John Doe",
        bankName: "Example Bank",
        targetEnrollments: 50,
        issue: "No issues reported",
      },
      totalEnrollments: 65,
    },
    {
      name: "jane smith",
      agent: {
        name: "jane smith",
        phone: "555-1234",
        email: "jane.smith@example.com",
        accountNumber: "5551234",
        accountName: "Jane Smith",
        bankName: "Example Bank",
        targetEnrollments: 50,
        issue: "No issues reported",
      },
      totalEnrollments: 45,
    },
    {
      name: "alice johnson",
      agent: {
        name: "alice johnson",
        phone: "555-5678",
        email: "alice.johnson@example.com",
        accountNumber: "5555678",
        accountName: "Alice Johnson",
        bankName: "Example Bank",
        targetEnrollments: 50,
        issue: "No issues reported",
      },
      totalEnrollments: 300,
    },
  ];
  enrollmenstReport.sort((a, b) => b.totalEnrollments - a.totalEnrollments);

  const [seeMore, setSeeMore] = React.useState(false);

  const visibleReports =
    enrollmenstReport.length > 3
      ? enrollmenstReport.slice(0, 3)
      : enrollmenstReport;

  const handleSeeMore = () => {
    setSeeMore(!seeMore);
  };

  const data = [
    {
      title: "Total Devices",
      value: "1,234",
      icon: "mobile-screen-button",
      footerInfo: "↑ 12% from last month",
    },
    {
      title: "Agents",
      value: "22",
      icon: "users",
      footerInfo: "18 working today",
    },
    {
      title: "Tickets",
      value: "5",
      icon: "ticket",
      footerInfo: "↑ 5% from last month",
    },
    {
      title: "Target Enrollments",
      value: "15000",
      icon: "bullseye",
      footerInfo: "330 enrollments remaining",
    },
  ];
  return (
    <div className="aggregator-dashboard">
      <div className="analytics-cards-container stat-grid">
        {data.map((item, index) => (
          <AnalyticsCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            footerInfo={item.footerInfo}
          />
        ))}
      </div>

      <div className="performance-section">
        <h2 className="performance-section-title">Agents Enrollment Report</h2>
        <div className="agents-enrollment-report-cards-container">
          {visibleReports.map((report, index) => (
            <AgentsEnrollmentReportCard
              key={index}
              name={report.name}
              agent={report.agent}
              totalEnrollments={report.totalEnrollments}
            />
          ))}
          <div
            className={`extra-enrollment-reports${seeMore ? " is-open" : ""}`}
            aria-hidden={!seeMore}
            inert={!seeMore}
          >
            <div className="extra-enrollment-reports-inner">
              {enrollmenstReport.slice(3).map((report) => (
                <AgentsEnrollmentReportCard
                  key={report.name}
                  name={report.name}
                  agent={report.agent}
                  totalEnrollments={report.totalEnrollments}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="see-more-btn"
            onClick={handleSeeMore}
            aria-expanded={seeMore}
            aria-controls="extra-enrollment-reports"
          >
            <i className="fas fa-chevron-down" aria-hidden="true" />
            {seeMore ? "See Less" : "See More"}
          </button>
        </div>
      </div>
      <div className="aggregator-target-section">
        <h2 className="aggregator-target-section-title">Current Target</h2>
        <AggregatorTargetBox
          target={1500}
          achieved={1100}
          dateline="2026-09-31"
        />
      </div>
    </div>
  );
}
