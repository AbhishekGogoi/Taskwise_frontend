import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createWorkspace,
         fetchWorkspaceByUserID,
         fetchWorkspaceById,
         fetchWorkspaceProjects,
         fetchWorkspaceMembers,
         uploadFile } from "./workspaceApi";

const initialState = {
  workspaces: [],
  workspaceFetchStatus: 'idle',
  selectedWorkspaces: null,
  status: "idle",
  errors: null,
  successMessage: null
}

export const fetchWorkspaceByUserIDAsync = createAsyncThunk("workspaces/fetchWorkspaceByUserID", async (userId) => {
  const workspaces = await fetchWorkspaceByUserID(userId);
  return workspaces;
});

export const fetchWorkspaceByIdAsync = createAsyncThunk("workspaces/fetchWorkspaceById", async (id) => {
  const workspaces = await fetchWorkspaceById(id);
  return workspaces;
});

export const fetchWorkspaceProjectsAsync = createAsyncThunk('workspace/fetchWorkspaceProjects', async (workspaceId) => {
    const workspaces = await fetchWorkspaceProjects(workspaceId);
    return workspaces;
  }
);

export const fetchWorkspaceMembersAsync = createAsyncThunk('workspace/fetchWorkspaceMembers', async (workspaceId) => {
    const workspaces = await fetchWorkspaceMembers(workspaceId);
    return workspaces;
  }
);

export const createWorkspaceAsync = createAsyncThunk(
  "workspaces/createWorkspace",
  async (newWorkspace) => {
    const response = await createWorkspace(newWorkspace);
    return response.data;
  }
);

export const uploadFileAsync = createAsyncThunk(
  "workspaces/uploadFile",
  async (formData) => {
    const response = await uploadFile(formData);
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
      state.successMessage = null;
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
      .addCase(fetchWorkspaceByIdAsync.pending, (state) => {
        state.workspaceFetchStatus = 'loading';
      })
      .addCase(fetchWorkspaceByIdAsync.fulfilled, (state, action) => {
        const existingWorkspace = state.workspaces.find(
          (workspace) => workspace.id === action.payload.id
        );
        if (existingWorkspace) {
          Object.assign(existingWorkspace, action.payload);
        } else {
          state.workspaces.push(action.payload);
        }
      })
      .addCase(fetchWorkspaceByIdAsync.rejected, (state, action) => {
        state.workspaceFetchStatus = "rejected";
        state.errors = action.error;
      })
      .addCase(fetchWorkspaceProjectsAsync.pending, (state) => {
        state.workspaceFetchStatus = 'loading';
      })
      .addCase(fetchWorkspaceProjectsAsync.fulfilled, (state, action) => {
        const { id, projects } = action.payload;
        const workspace = state.workspaces.find(ws => ws.id === id);
        if (workspace) {
            workspace.projects = projects;
        }
        state.workspaceFetchStatus = 'fulfilled'; // Reset fetch status
      })
      .addCase(fetchWorkspaceProjectsAsync.rejected, (state, action) => {
        state.workspaceFetchStatus = "rejected";
        state.errors = action.error;
      })
      .addCase(fetchWorkspaceMembersAsync.pending, (state) => {
        state.workspaceFetchStatus = 'loading';
      })
      .addCase(fetchWorkspaceMembersAsync.fulfilled, (state, action) => {
        const { id, members } = action.payload;
        const workspace = state.workspaces.find(ws => ws.id === id);
        if (workspace) {
            workspace.members = members;
        }
        state.workspaceFetchStatus = 'fulfilled'; // Reset fetch status
      })
      .addCase(fetchWorkspaceMembersAsync.rejected, (state, action) => {
        state.workspaceFetchStatus = "rejected";
        state.errors = action.error;
      })
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
        state.successMessage = 'Workspace created successfully!';
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
