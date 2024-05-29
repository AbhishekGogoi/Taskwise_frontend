import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { createWorkspace, fetchWorkspaces } from "./workspaceApi";

const initialState={
    workspaces:[],
    workspaceFetchStatus: 'idle',
    selectedWorkspaces:null,
    status:"idle",
    errors:null,
    sucessMessage:null
}

export const fetchWorkspaceAsync=createAsyncThunk("workspacess/fetchWorkspaces",async()=>{
    const workspaces=await fetchWorkspaces();
    return workspaces
});

export const createWorkspaceAsync = createAsyncThunk(
    "workspaces/createWorkspace",
    async (newWorkspace) => {
      const response = await createWorkspace(newWorkspace);
      return response.data;
    }
  );

  const workspaceSlice = createSlice({
    name: "workspaceSlice",
    initialState: initialState,
    reducers: {
      clearworkspaceErrors: (state) => {
        state.errors = null;
      },
      clearworkspaceSuccessMessage: (state) => {
        state.sucessMessage = null;
      },
      resetworkspaceStatus: (state) => {
        state.status = 'idle';
      },
      resetworkspacesFetchStatus: (state) => {
        state.workspaceFetchStatus = 'idle';
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchWorkspaceAsync.pending, (state) => {
          state.workspaceFetchStatus = 'loading';
        })
        .addCase(fetchWorkspaceAsync.fulfilled, (state, action) => {
          state.workspaceFetchStatus = "fulfilled";
          state.workspaces = action.payload.data;
        })
        .addCase(fetchWorkspaceAsync.rejected, (state, action) => {
          state.workspaceFetchStatus = "rejected";
          state.errors = action.error;
        })
        .addCase(createWorkspaceAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createWorkspaceAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.workspaces.push(action.payload); // Update the state with the new workspace
          state.sucessMessage = 'Workspace created successfully!';
        })
        .addCase(createWorkspaceAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.errors = action.error.message;
        });
    }
  });
  

export const {
    clearworkspaceErrors,
    clearworkspaceSuccessMessage,
    resetworkspaceStatus,
    resetworkspacesFetchStatus
} = workspaceSlice.actions;

export default workspaceSlice.reducer;