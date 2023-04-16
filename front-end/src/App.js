import React, { useState } from "react";
import DataTable from "./DataTable";

const App = () => {
  const [data, setData] = useState([
    { id: 1, name: "John Doe", age: 30, email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", age: 25, email: "jane.smith@example.com" },
    { id: 3, name: "Bob Johnson", age: 45, email: "bob.johnson@example.com" },
  ]);

  return (
    <div>
      <h1>Data Table</h1>
      <DataTable data={data} setData={setData}/>
    </div>
  );
};

export default App;
