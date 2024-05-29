import React, { useMemo, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { styled } from "@mui/material/styles";
import tasksData from "../../data/tasks.json";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const StyledAgGridContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
}));

const WorkspaceTaskPage = () => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [rowData] = useState(tasksData);

  const [colDefs] = useState([
    { field: "Task", flex: 2, sortable: true, filter: "agTextColumnFilter" },
    { field: "DueDate", flex: 1, sortable: true, filter: "agTextColumnFilter" },
    {
      field: "Priority",
      flex: 1,
      sortable: true,
      filter: "agTextColumnFilter",
      cellRenderer: "PriorityCellRenderer"
    },
    { field: "Status", flex: 1, sortable: true, filter: "agTextColumnFilter" },
    { field: "Project", flex: 1, sortable: true, filter: "agTextColumnFilter" },
  ]);

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
