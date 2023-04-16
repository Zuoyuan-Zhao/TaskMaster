import React, { useState } from "react";
import "./DataTable.css";
import Table from "./Table";
import Filter from "./Filter";
import CreateRow from "./CreateRow";
import DataRow from "./DataRow";

const DataTable = ({ data, setData }) => {
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [editingRow, setEditingRow] = useState({});
  const [newRow, setNewRow] = useState({});
  const [filterValue, setFilterValue] = useState("");

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
    newData[rowIndex] = row;
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

  const filteredData = data.filter((row) => {
    return Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filterValue.toLowerCase())
    );
  });

  return (
    <div>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      <Table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((pair, rowIndex) => (
            <DataRow
              key={rowIndex}
              pair={pair}
              rowIndex={rowIndex}
              editingRowIndex={editingRowIndex}
              editingRow={editingRow}
              handleDelete={handleDelete}
              handleEditingChange={handleEditingChange}
              handleSave={handleSave}
              handleCancelEdit={handleCancelEdit}
              filterValue={filterValue}
            />
          ))}
        </tbody>
      </Table>
      <CreateRow
        data={data}
        newRow={newRow}
        handleNewRowChange={handleNewRowChange}
        handleCreateNew={handleCreateNew}
      />
    </div>
  );
};

export default DataTable;
