import React, { useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { styled } from "@mui/material/styles";

// Register the necessary modules with AG Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Styled container for the AG Grid
const StyledAgGridContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
}));

// Main component to display the tasks data
const WorkspaceTaskPage = ({ tasksData }) => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // Set the row data using the provided tasksData
  const [rowData] = useState(tasksData);

  // Define the column definitions to match the structure of the tasks data
  const [colDefs] = useState([
    { field: "name", headerName: "Task", flex: 1, sortable: true, filter: "agTextColumnFilter" },
    { field: "dueDate", headerName: "Due Date", flex: 1, sortable: true, filter: "agTextColumnFilter" },
    { field: "priority", headerName: "Priority", flex: 1, sortable: true, filter: "agTextColumnFilter" },
    // { field: "status", headerName: "Satus", flex: 1, sortable: true, filter: "agTextColumnFilter" },
    { field: "project", headerName: "Project", flex: 1, sortable: true, filter: "agTextColumnFilter" },
  ]);

  // Default column properties
  const defaultColDef = useMemo(() => ({
    filter: true,
    floatingFilter: true,
    resizable: true,
    minWidth: 100,
  }), []);

  return (
    <StyledAgGridContainer>
      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
        />
      </div>
    </StyledAgGridContainer>
  );
};

export default WorkspaceTaskPage;
