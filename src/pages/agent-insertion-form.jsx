function AgentInsertionForm() {
  const role = "Admin";

  const handleSubmit = (e) => {
    e.preventDefault();
    const myData = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(myData.entries());
    console.log(dataObj);
  };

  const myDevices = [
    {
      id: "NIMC-1",
      model: "Cumbo",
      status: "Assigned",
      imei: "356938035643809",
    },
    {
      id: "NIMC-2",
      model: "Cumbo",
      status: "Unassigned",
      imei: "356938035643809",
    },
    {
      id: "NIMC-3",
      model: "Cumbo",
      status: "Assigned",
      imei: "356938035643809",
    },
    {
      id: "NIMC-4",
      model: "Cumbo",
      status: "Unassigned",
      imei: "356938035643809",
    },
    {
      id: "NIMC-5",
      model: "Cumbo",
      status: "Unassigned",
      imei: "356938035643809",
    },
  ];
  const fields = [
    {
      id: "Full Name",
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      required: true,
    },
    {
      id: "Phone Number",
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter phone number",
      required: true,
    },
    {
      id: "Email Address",
      name: "emailAddress",
      label: "Email Address",
      type: "text",
      placeholder: "Enter email address",
      required: true,
    },
  ];
  const bankFields = [
    {
      id: "Bank Name",
      name: "bankName",
      label: "Bank Name",
      type: "text",
      placeholder: "Enter bank name",
      required: true,
    },
    {
      id: "Account Name",
      name: "accountName",
      label: "Account Name",
      type: "text",
      placeholder: "Enter account name",
      required: true,
    },
    {
      id: "Account Number",
      name: "accountNumber",
      label: "Account Number",
      type: "text",
      placeholder: "Enter account number",
      required: true,
    },
  ];
  return (
    <form
      className="agent-insertion-form"
      name="agentInsertionForm"
      onSubmit={(e) => handleSubmit(e)}
    >
      <header className="agent-insertion-form-header">
        <h1>Add agent</h1>
        <p>Create a new agent account</p>
      </header>
      <div className="agent-insertion-form-personal-details">
        <div className="agent-insertion-form-personal-details-header">
          <h2>Personal details</h2>
        </div>
        {fields.map(
          ({ id, name, label, type, placeholder, required }, index) => (
            <div className="agent-insertion-form-field" key={index}>
              <label htmlFor={id}>{label}</label>
              <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                required={required}
              />
            </div>
          ),
        )}

        {role === "Admin" && (
          <div className="agent-insertion-form-field">
            <label htmlFor="role">Role</label>
            <select name="role" id="role">
              <option value="Agent">Agent</option>
              <option value="Technician">Technician</option>
              <option value="Aggregator">Aggregator</option>
            </select>
          </div>
        )}
      </div>
      <div className="agent-insertion-form-account-details">
        <h2 className="agent-insertion-form-section-header">Payment details</h2>
        {bankFields.map(
          ({ id, name, label, type, placeholder, required }, index) => (
            <div className="agent-insertion-form-field" key={index}>
              <label htmlFor={id}>{label}</label>
              <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                required={required}
              />
            </div>
          ),
        )}
      </div>
      <div className="agent-insertion-form-device-details">
        <h2 className="agent-insertion-form-device-details-header">Devices</h2>
        <label className="agent-insertion-form-device-label" htmlFor="device">
          Assign devices <span>(optional)</span>
        </label>
        <div className="agent-insertion-form-device-details-content">
          <select name="device" id="device">
            <option value="">Select available devices</option>
            {myDevices.map(({ model, status, imei }, index) => (
              <option key={index} value={imei}>
                {model} - {status}
              </option>
            ))}
          </select>
        </div>
        <p className="agent-insertion-form-device-hint">
          {myDevices.length} devices available · You can also assign them later
        </p>
      </div>
      <div className="agent-insertion-form-submit-button">
        <button type="submit">Save agent</button>
        <button type="reset">Cancel</button>
      </div>
    </form>
  );
}
export default AgentInsertionForm;
