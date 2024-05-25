import React, { useState, useMemo } from "react";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { styled } from "@mui/material/styles";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridDiv = document.querySelector("#myGrid");

const StyledAgGridContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  paddingLeft: "50px",
  paddingTop: "40px", // Ensure container takes at least the viewport height
});

const MyTaskPage = () => {
  const [rowData, setRowData] = useState([
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Design feedback on wireframe",
      DueDate: "7 Oct",
      Priority: "Hard",
      Status: "Ongoing",
      Workspace: "Book App",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "Task" },
    { field: "DueDate" },
    { field: "Priority" },
    { field: "Status" },
    { field: "Workspace" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      flex: 2,
    };
  }, []);

  return (
    <StyledAgGridContainer>
      <div className={"ag-theme-quartz"} style={{ width: 1600, height: 600 }}>
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

export default MyTaskPage;
