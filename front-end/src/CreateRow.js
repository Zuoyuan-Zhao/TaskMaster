import React from "react";
import "./CreateRow.css";

const CreateRow = ({ data, newRow, handleNewRowChange, handleCreateNew }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleNewRowChange(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateNew();
  };

  return (
    <form className="create-row" onSubmit={handleSubmit}>
      <h2>Create New Row</h2>
      {Object.keys(data[0]).map((key) => (
        <div key={key}>
          <label htmlFor={key}>{key}: </label>
          <input
            type="text"
            name={key}
            id={key}
            value={newRow[key] || ""}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateRow;
