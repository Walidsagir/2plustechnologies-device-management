import React from "react";
import AnalyticsCard from "../components/analytics-card";

export default function AggrigatorDashboard() {
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
      title: "Target",
      value: "75%",
      icon: "bullseye",
      footerInfo: "On track to meet goal",
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
    </div>
  );
}
