import React from "react";

const TableRow = ({
  columns,
  row,
  rowIndex,
  editingRowIndex,
  editingRow,
  isMatchingFilter,
  handleEdit,
  handleDelete,
  handleSave,
  handleCancelEdit,
  handleEditingChange,
}) => {
  return (
    <tr key={rowIndex}>
      {columns.map((column) => {
        const cellValue = row[column];
        const isCellEditing = editingRowIndex === rowIndex;

        return (
          <td
            key={column}
            className={isMatchingFilter ? "matching-cell" : ""}
          >
            {isCellEditing ? (
              <input
                type="text"
                value={editingRow[column]}
                onChange={(e) => handleEditingChange(column, e.target.value)}
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
            <button onClick={() => handleSave(row, rowIndex)}>Save</button>
            <button onClick={() => handleCancelEdit()}>Cancel</button>
          </>
        ) : (
          <button onClick={() => handleEdit(row, rowIndex)}>Edit</button>
        )}
        <button onClick={() => handleDelete(rowIndex)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
