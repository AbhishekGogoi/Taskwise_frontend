import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { createWorkspace, fetchWorkspaceByUserID } from "./workspaceApi";

const initialState={
    workspaces:[],
    workspaceFetchStatus: 'idle',
    selectedWorkspaces:null,
    status:"idle",
    errors:null,
    sucessMessage:null
}

export const fetchWorkspaceByUserIDAsync=createAsyncThunk("workspacess/fetchWorkspaceByUserID",async(userId)=>{
    const workspaces=await fetchWorkspaceByUserID(userId);
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
        .addCase(fetchWorkspaceByUserIDAsync.pending, (state) => {
          state.workspaceFetchStatus = 'loading';
        })
        .addCase(fetchWorkspaceByUserIDAsync.fulfilled, (state, action) => {
          state.workspaceFetchStatus = "fulfilled";
          state.workspaces = action.payload.data;
        })
        .addCase(fetchWorkspaceByUserIDAsync.rejected, (state, action) => {
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