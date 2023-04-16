import React, { useState } from "react";
import "./Filter.css";


const DataRow = ({ pair, rowIndex, handleDelete, handleSave, filterValue }) => {
  const [editingRow, setEditingRow] = useState(pair);
  const [isCellEditing, setIsCellEditing] = useState(false);

  const handleEditingChange = (key, value) => {
    setEditingRow({ ...editingRow, [key]: value });    
  };

  const handleEditClick = () => {
    setIsCellEditing(true);
  };

  const handleCancelClick = () => {
    setIsCellEditing(false);
    setEditingRow(pair);
  };

  const handleSaveClick = () => {
    handleSave(editingRow, rowIndex);
    setIsCellEditing(false);
  };

  return (
    <tr>
      {Object.keys(pair).map((key) => {
        const cellValue = pair[key];
        const isMatchingFilter = filterValue
          ? cellValue.toString().toLowerCase().includes(filterValue.toLowerCase())
          : "";
        return (
          <td key={key} className={isMatchingFilter ? "matching-cell" : ""}>
            {isCellEditing ? (
              <input
                type="text"
                value={editingRow[key]}
                onChange={(e) => handleEditingChange(key, e.target.value)}
              />
            ) : (
              cellValue
            )}
          </td>
        );
      })}
      <td>
        {isCellEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        <button onClick={() => handleDelete(rowIndex)}>Delete</button>
      </td>
    </tr>
  );
};

export default DataRow;
