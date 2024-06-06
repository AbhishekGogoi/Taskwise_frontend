import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createWorkspace,
         fetchWorkspaceByUserID,
         fetchWorkspaceById,
         fetchWorkspaceProjects,
         fetchWorkspaceMembers,
         fetchWorkspaceTasks,
         uploadFile,
         getImageUrl,
         exitMember,
         updateMemberRole, 
         addMember,
         updateWorkspace } from "./workspaceApi";

const initialState = {
  workspaces: [],
  workspaceFetchStatus: 'idle',
  selectedWorkspaces: null,
  selectedProjects: [],
  selectedTasks: [],
  selectedMembers: [],
  projectsFetchStatus: 'idle',
  tasksFetchStatus: 'idle',
  membersFetchStatus: 'idle',
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

export const fetchWorkspaceProjectsAsync = createAsyncThunk(
  'workspace/fetchWorkspaceProjects',
  async (workspaceId) => {
    const selectedProjects = await fetchWorkspaceProjects(workspaceId);
    return selectedProjects;
  }
);

export const fetchWorkspaceTasksAsync = createAsyncThunk(
  'workspace/fetchWorkspaceTasksAsync',
  async (workspaceId) => {
    const selectedMembers = await fetchWorkspaceTasks(workspaceId);
    return selectedMembers;
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

// Redux thunk to get the image URL
export const getImageUrlAsync = createAsyncThunk(
  "workspaces/getImageUrl",
  async (key) => {
    const response = await getImageUrl(key);
    return response.data;
  }
);

export const exitMemberAsync = createAsyncThunk(
  "workspaces/exitMember",
  async ({ workspaceId, userId }) => {
    const response = await exitMember(workspaceId, userId);
    return response.data;
  }
);

export const updateMemberRoleAsync = createAsyncThunk(
  'members/updateMemberRole',
  async ({ workspaceId, adminUserId, userId, role }) => {
    const response = await updateMemberRole(workspaceId, adminUserId, userId, role);
    return response.data;
  }
);

export const addMemberAsync = createAsyncThunk(
  'members/addMember',
  async ({ workspaceId, adminUserId, memberEmails }) => {
    const response = await addMember(workspaceId, adminUserId, memberEmails);
    return response.data;
  }
);

export const updateWorkspaceAsync = createAsyncThunk(
  "workspaces/updateWorkspace",
  async (workspaceId, name, imgUrl, imgKey) => {
    const response = await updateWorkspace(workspaceId, name, imgUrl, imgKey);
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
      .addCase(fetchWorkspaceProjectsAsync.pending,(state)=>{
          state.projectsFetchStatus="loading"
      })
      .addCase(fetchWorkspaceProjectsAsync.fulfilled,(state,action)=>{
          state.projectsFetchStatus="fulfilled"
          state.selectedProjects=action.payload.data
      })
      .addCase(fetchWorkspaceProjectsAsync.rejected,(state,action)=>{
          state.projectsFetchStatus="rejected"
          state.errors=action.error
      })
      .addCase(fetchWorkspaceTasksAsync.pending,(state)=>{
          state.tasksFetchStatus="loading"
      })
      .addCase(fetchWorkspaceTasksAsync.fulfilled,(state,action)=>{
          state.tasksFetchStatus="fulfilled"
          state.selectedTasks=action.payload.data
      })
      .addCase(fetchWorkspaceTasksAsync.rejected,(state,action)=>{
          state.tasksFetchStatus="rejected"
          state.errors=action.error
      })
      .addCase(fetchWorkspaceMembersAsync.pending,(state)=>{
          state.membersFetchStatus="loading"
      })
      .addCase(fetchWorkspaceMembersAsync.fulfilled,(state,action)=>{
          state.membersFetchStatus="fulfilled"
          state.selectedMembers=action.payload.data
      })
      .addCase(fetchWorkspaceMembersAsync.rejected,(state,action)=>{
          state.membersFetchStatus="rejected"
          state.errors=action.error
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
      })
      .addCase(exitMemberAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(exitMemberAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'Member exited successfully!';
      })
      .addCase(exitMemberAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message;
      })
      .addCase(updateMemberRoleAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMemberRoleAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'Updated Member Role successfully!';
      })
      .addCase(updateMemberRoleAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message;
      })
      .addCase(addMemberAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addMemberAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'Added Member successfully!';
      })
      .addCase(addMemberAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message;
      })
      .addCase(updateWorkspaceAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateWorkspaceAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.successMessage = 'Workspace updated successfully!';
      })
      .addCase(updateWorkspaceAsync.rejected, (state, action) => {
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
