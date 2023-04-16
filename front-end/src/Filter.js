import React from "react";
import "./Filter.css";

const Filter = ({ filterValue, setFilterValue }) => {
  return (
    <div className="filter-container">
      <label>Type in any keyword you'd like to search:</label>
      <input
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="filter-input"
      />
    </div>
  );
};

export default Filter;
