import MyForm from "../components/form";
import { useState, useEffect } from "react";
import api from "../api";

function AddDevicePage() {
  const [device, setDevice] = useState({});
  const [agentsUnassigned, setAgentsUnassigned] = useState([]);
  const [aggregators, setAggregators] = useState([]);

  const deviceFormPreviewData = {
    endpoint: "devices",
    title: "Device details",
    description: "Add a device and choose how it should be assigned.",
    secondTitle: "Assignment",
    firstColumn: {
      fields: [
        {
          id: "imei1",
          name: "imei1",
          label: "IMEI-1 number",
          type: "input",
          placeholder: "15-digit IMEI",
          required: true,
        },

        {
          id: "imei2",
          name: "imei2",
          label: "IMEI-2 number",
          type: "input",
          placeholder: "15-digit IMEI",
          required: true,
        },
        {
          id: "model",
          name: "model",
          label: "Model",
          type: "select",
          placeholder: "Select model",
          required: true,
          options: [
            { id: "cumbo", value: "cumbo", name: "Cumbo" },
            {
              id: "techno-crate",
              value: "techno-crate",
              name: "Techno Crate",
            },
            { id: "bio-rugged", value: "bio-rugged", name: "Bio Rugged" },
            { id: "other", value: "other", name: "Other" },
          ],
        },
        {
          id: "notes",
          name: "notes",
          label: "Notes",
          type: "input",
          placeholder: "Anything a technician should know",
        },
      ],
    },
    secondColumn: {
      fields: [
        {
          id: "status",
          name: "status",
          label: "Status",
          type: "select",
          placeholder: "Select status",
          required: true,
          options: [
            { id: "available", value: "available", name: "Available" },
            { id: "assigned", value: "assigned", name: "Assigned" },
          ],
        },
        {
          id: "agent",
          name: "agent",
          label: "Assign to agent (optional)",
          type: "select",
          placeholder: "Select agent",
          options: agentsUnassigned,
        },
        {
          id: "aggregator",
          name: "aggregator",
          label: "Aggregator",
          type: "select",
          placeholder: "Select aggregator",
          required: true,
          options: aggregators,
        },
      ],
    },
    submitLabel: "Save device",
    cancelLabel: "Cancel",
  };

  return (
    <div className="add-device-page">
      <div className="add-device-page-header"></div>
      <MyForm formData={deviceFormPreviewData} />
    </div>
  );
}

export default AddDevicePage;
