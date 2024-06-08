import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Button, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
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

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "6px",
  paddingTop: "5rem", // Adjust to add space above the buttons
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column", // Stack buttons vertically on small screens
    width: "100%", // Ensure full width for small screens
    gap: "1rem", // Add gap between buttons on small screens
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row", // Row layout on medium and large screens
    width: "auto", // Default width for medium and large screens
    gap: "0", // No gap between buttons on medium and large screens
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #3EC8FE 0%, #8A4EFF 100%)",
  color: "white",
  borderRadius: "20px", // Make the corners rounded
  padding: "0.5rem 2rem", // Adjust padding to fit the design
  "&:hover": {
    background: "linear-gradient(90deg, #3EC8FE 0%, #8A4EFF 100%)", // Ensure the gradient stays the same on hover
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%", // Full width on small screens
  },
  [theme.breakpoints.up("sm")]: {
    width: "auto", // Auto width on medium and large screens
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#e0e0e0", // Light gray color
  color: "black",
  borderRadius: "20px", // Rounded corners
  padding: "0.5rem 2.5rem", // Adjust padding to fit the design and make the button wider
  minWidth: "200px", // Set a minimum width for the button
  "&:hover": {
    backgroundColor: "#d5d5d5", // Slightly darker on hover
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%", // Full width on small screens
    minWidth: "auto", // Remove minimum width on small screens
  },
  [theme.breakpoints.up("sm")]: {
    width: "auto", // Auto width on medium and large screens
    minWidth: "200px", // Default minimum width on medium and large screens
  },
}));
// const Toolbar = styled(Box)({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   width: "100%",
//   paddingBottom: "1rem",
//   paddingLeft: "8px",
// });

const AIResultPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

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
          height: isSmallScreen ? "auto" : 50, // Adjust height for small screens
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column", // Change flex direction to column
          padding: isSmallScreen ? 1 : 2, // Add padding for better spacing
          width: isSmallScreen ? "100%" : "auto", // Adjust width for small screens
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
