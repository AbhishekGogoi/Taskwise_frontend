import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { styled } from "@mui/material/styles";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// const gridDiv = document.querySelector("#myGrid");

const StyledAgGridContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "2rem", // Ensure container takes at least the viewport height
});

const Toolbar = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingBottom: "3rem",
});

const MyTaskPage = () => {
  const [selectedProject, setSelectedProject] = useState("");

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

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
    <StyledAgGridContainer>
      <Toolbar>
        <Typography variant="h6">My Tasks</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-label">
              Select Project
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProject}
              label="Select Project"
              onChange={handleProjectChange}
            >
              <MenuItem value="Project 1">Project 1</MenuItem>
              <MenuItem value="Project 2">Project 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "white" }}
          />
        </Box>
      </Toolbar>
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
  );
};

export default MyTaskPage;
