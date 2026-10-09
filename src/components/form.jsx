import { useState } from "react";
import api from "../api";

function MyForm({ formData }) {
  const endpoint = formData.endpoint;

  const haandleSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const response = await api.post(`/api/${endpoint}`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const firstColumn = formData.firstColumn;
  const secondColumn = formData.secondColumn;
  return (
    <div className="form-container">
      <div className="form-header">
        <h1>{formData.title}</h1>
        <p>{formData.description}</p>
      </div>
      <form className="form">
        <section className="form-section-1">
          <h2>{formData.title}</h2>
          <div className="form-section-1-content">
            {firstColumn.fields.map((field) => {
              if (field.type === "input") {
                return (
                  <div className="form-field" key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  </div>
                );
              } else if (field.type === "select") {
                return (
                  <div className="form-field" key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <select name={field.name} id={field.id}>
                      <option value="">{field.placeholder}</option>
                      {field.options.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
            })}
          </div>
        </section>
        <section className="form-section-2">
          <h2>{formData.secondTitle}</h2>
          <div className="form-section-2-content">
            {secondColumn.fields.map((field) => {
              if (field.type === "text") {
                return (
                  <div className="form-section-2-field" key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  </div>
                );
              }
              if (field.type === "select") {
                return (
                  <div className="form-section-2-field" key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <select
                      id={field.id}
                      required={field.required}
                      name={field.name}
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options.map((option) => (
                        <option
                          key={option.id ?? option.value ?? option.name}
                          value={option.value}
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
            })}
          </div>
        </section>
        <div className="form-submit-button">
          <button type="submit">Save</button>
          <button type="reset">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default MyForm;
