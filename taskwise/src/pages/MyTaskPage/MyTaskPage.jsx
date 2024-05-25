import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
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
  // Height: "100vh",
  // width: "100vh",
  // paddingLeft: "0.5rem",
  paddingTop: "5rem", // Ensure container takes at least the viewport height
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
      Task: "Review UI elements",
      DueDate: "8 Oct",
      Priority: "Medium",
      Status: "Pending",
      Workspace: "Book App",
    },
    {
      Task: "Update color scheme",
      DueDate: "9 Oct",
      Priority: "High",
      Status: "Completed",
      Workspace: "Book App",
    },
    {
      Task: "Finalize typography",
      DueDate: "10 Oct",
      Priority: "Low",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Implement feedback",
      DueDate: "11 Oct",
      Priority: "High",
      Status: "Pending",
      Workspace: "Book App",
    },
    {
      Task: "User testing",
      DueDate: "12 Oct",
      Priority: "Medium",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Fix bugs",
      DueDate: "13 Oct",
      Priority: "High",
      Status: "Pending",
      Workspace: "Book App",
    },
    {
      Task: "Optimize performance",
      DueDate: "14 Oct",
      Priority: "Medium",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Create documentation",
      DueDate: "15 Oct",
      Priority: "Low",
      Status: "Pending",
      Workspace: "Book App",
    },
    {
      Task: "Deploy app",
      DueDate: "16 Oct",
      Priority: "High",
      Status: "Completed",
      Workspace: "Book App",
    },
    {
      Task: "Monitor app performance",
      DueDate: "17 Oct",
      Priority: "Medium",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Gather user feedback",
      DueDate: "18 Oct",
      Priority: "High",
      Status: "Pending",
      Workspace: "Book App",
    },
    {
      Task: "Prepare for presentation",
      DueDate: "19 Oct",
      Priority: "Low",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Client meeting",
      DueDate: "20 Oct",
      Priority: "High",
      Status: "Completed",
      Workspace: "Book App",
    },
    {
      Task: "Refactor code",
      DueDate: "21 Oct",
      Priority: "Medium",
      Status: "Pending",
      Workspace: "Book App",
    },
    {
      Task: "Update project plan",
      DueDate: "22 Oct",
      Priority: "Low",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Backlog grooming",
      DueDate: "23 Oct",
      Priority: "Medium",
      Status: "Pending",
      Workspace: "Book App",
    },
    {
      Task: "Sprint planning",
      DueDate: "24 Oct",
      Priority: "High",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Review design patterns",
      DueDate: "25 Oct",
      Priority: "Low",
      Status: "Completed",
      Workspace: "Book App",
    },
    {
      Task: "Code review",
      DueDate: "26 Oct",
      Priority: "High",
      Status: "Pending",
      Workspace: "Book App",
    },
    {
      Task: "Update README",
      DueDate: "27 Oct",
      Priority: "Medium",
      Status: "Ongoing",
      Workspace: "Book App",
    },
    {
      Task: "Check cross-browser compatibility",
      DueDate: "28 Oct",
      Priority: "High",
      Status: "Pending",
      Workspace: "Book App",
    },
    {
      Task: "Finalize release notes",
      DueDate: "29 Oct",
      Priority: "Low",
      Status: "Completed",
      Workspace: "Book App",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "Task", flex: 2 },
    { field: "DueDate", flex: 0.5 },
    { field: "Priority", flex: 0.5 },
    { field: "Status", flex: 0.5 },
    { field: "Workspace", flex: 0.5 },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      // flex: 2,
    };
  }, []);

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     "& > :not(style)": {
    //       m: 1,
    //       width: "100%",
    //     },
    //   }}
    // >
    <StyledAgGridContainer>
      <div className={"ag-theme-quartz"} style={{ width: "100%", height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
        />
      </div>
    </StyledAgGridContainer>
    // </Box>
  );
};

export default MyTaskPage;
