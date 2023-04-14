import React, { useState } from "react";
import "./DataTable.css";

const DataTable = ({ data, setData }) => {
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [editingRow, setEditingRow] = useState({});
  const [newRow, setNewRow] = useState({});

  const handleEdit = (row, rowIndex) => {
    setEditingRowIndex(rowIndex);
    setEditingRow(row);
  };

  const handleDelete = (rowIndex) => {
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
  };

  const handleEditingChange = (key, value) => {
    setEditingRow({ ...editingRow, [key]: value });
  };

  const handleSave = (row, rowIndex) => {
    const newData = [...data];
    newData[rowIndex] = editingRow;
    setData(newData);
    setEditingRowIndex(-1);
    setEditingRow({});
  };

  const handleCancelEdit = () => {
    setEditingRowIndex(-1);
    setEditingRow({});
  };

  const handleNewRowChange = (key, value) => {
    setNewRow({ ...newRow, [key]: value });
  };

  const handleCreateNew = () => {
    const newData = [...data];
    newData.push(newRow);
    setData(newData);
    setNewRow({});
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pair, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(pair).map((key) => {
                const cellValue = pair[key];
                const isCellEditing = editingRowIndex === rowIndex;

                return (
                  <td key={key}>
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
                {editingRowIndex === rowIndex ? (
                  <>
                    <button onClick={() => handleSave(pair, rowIndex)}>Save</button>
                    <button onClick={() => handleCancelEdit()}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(pair, rowIndex)}>Edit</button>
                )}
                <button onClick={() => handleDelete(rowIndex)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="create-row">
        <h2>Create new row</h2>
        {Object.keys(data[0]).map((key) => (
          <div key={key}>
            <label >{key}</label>
            <input type="text" value={newRow[key] || ""} onChange={(e) => handleNewRowChange(key, e.target.value)} />
          </div>
        ))}
        <button onClick={() => handleCreateNew()}>Create new</button>
      </div>
    </div>
  );
};

export default DataTable;