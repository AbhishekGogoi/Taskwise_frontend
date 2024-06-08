import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the ArrowBack icon

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const StyledAgGridContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
  paddingTop: "3rem",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "99%",
  padding: "1rem",
  paddingTop: "5rem", // Adjust to add space above the buttons
  alignItems: "center",
});

const GradientButton = styled(Button)({
  background: "linear-gradient(90deg, #3EC8FE 0%, #8A4EFF 100%)",
  color: "white",
  borderRadius: "20px", // Make the corners rounded
  padding: "0.5rem 2rem", // Adjust padding to fit the design
  "&:hover": {
    background: "linear-gradient(90deg, #3EC8FE 0%, #8A4EFF 100%)", // Ensure the gradient stays the same on hover
  },
});

const BackButton = styled(Button)({
  backgroundColor: "#e0e0e0", // Light gray color
  color: "black",
  borderRadius: "20px", // Rounded corners
  padding: "0.5rem 2.5rem", // Adjust padding to fit the design and make the button wider
  minWidth: "200px", // Set a minimum width for the button
  "&:hover": {
    backgroundColor: "#d5d5d5", // Slightly darker on hover
  },
});

// const Toolbar = styled(Box)({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   width: "100%",
//   paddingBottom: "1rem",
//   paddingLeft: "8px",
// });

const AIResultPage = () => {
  const navigate = useNavigate();

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [rowData, setRowData] = useState([
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
    {
      Task: "Design feedback on wireframe",
      TaskDescription: "7 Oct",
    },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "Task", width: 350 },
    { field: "TaskDescription", width: 350 },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      editable: true,
    };
  }, []);

  const autoSizeStrategy = useMemo(() => {
    return {
      type: "fitGridWidth",
    };
  }, []);

  const handleBack = () => {
    navigate("/ai-create-project");
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          height: 50, // Adjust height to fit both texts
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column", // Change flex direction to column
          padding: 2, // Add padding for better spacing
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{ fontWeight: "bold", mb: 1, color: "#3780ED" }} // Add margin-bottom for spacing
        >
          Your project is here
        </Typography>
        <Typography
          variant="body2" // Changed from body3 to body2 as MUI doesn't have a body3 variant
          component="div"
          sx={{ fontWeight: "bold", textAlign: "center" }} // Add textAlign for centering
        >
          You just generated a new project using TaskWise AI! You can now
          customize and edit everything to your liking.
        </Typography>
      </Paper>
      <StyledAgGridContainer>
        <div className={"ag-theme-quartz"} style={gridStyle}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            autoSizeStrategy={autoSizeStrategy}
            editType="fullRow"
            domLayout="normal"
          />
        </div>
      </StyledAgGridContainer>
      <ButtonContainer>
        <BackButton
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back
        </BackButton>
        <GradientButton variant="contained">Create Project</GradientButton>
      </ButtonContainer>
    </>
  );
};

export default AIResultPage;
