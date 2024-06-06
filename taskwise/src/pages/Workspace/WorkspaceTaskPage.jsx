import React, { useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { styled } from "@mui/material/styles";
import { format } from 'date-fns';

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

// Styled message for no tasks
const NoTasksMessage = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  fontSize: "1.5rem",
  color: theme.palette.text.secondary,
}));

// Main component to display the tasks data
const WorkspaceTaskPage = ({ tasksData }) => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  // Set the row data using the provided tasksData
  const [rowData] = useState(tasksData);

  // Define the column definitions to match the structure of the tasks data
  const [colDefs] = useState([
    { 
      field: "name", 
      headerName: "Task", 
      flex: 1, 
      sortable: true, 
      filter: "agTextColumnFilter" 
    },
    { 
      field: "dueDate", 
      headerName: "Due Date", 
      flex: 1, 
      sortable: true, 
      filter: "agTextColumnFilter",
      valueFormatter: params => formatDate(params.value) // Use a custom formatter function
    },
    { 
      field: "priority", 
      headerName: "Priority", 
      flex: 1, 
      sortable: true, 
      filter: "agTextColumnFilter" 
    },
    { 
      field: "project", 
      headerName: "Project", 
      flex: 1, 
      sortable: true, 
      filter: "agTextColumnFilter" 
    },
  ]);

  // Custom function to format date into a readable format
  const formatDate = (dateString) => {
    if (!dateString) return ''; 
    const date = new Date(dateString);
    return format(date, 'dd MMM yy'); 
  };
  
  // Default column properties
  const defaultColDef = useMemo(() => ({
    filter: true,
    floatingFilter: true,
    resizable: true,
    minWidth: 100,
  }), []);

  return (
    <StyledAgGridContainer>
      {rowData && rowData.length > 0 ? (
        <div className="ag-theme-alpine" style={gridStyle}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            suppressRowClickSelection={true}
          />
        </div>
      ) : (
        <NoTasksMessage>There are no tasks on your list at this moment</NoTasksMessage>
      )}
    </StyledAgGridContainer>
  );
};

export default WorkspaceTaskPage;
