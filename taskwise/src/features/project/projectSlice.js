import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { fetchProjects, fetchProjectById, addProject } from "./projectApi";

const initialState={
    projects:[],
    projectFetchStatus: 'idle',
    projectAddStatus:"idle",
    selectedProject:null,
    status:"idle",
    errors:null,
    sucessMessage:null
}

export const fetchProjectAsync=createAsyncThunk("projects/fetchProjects",async(userId)=>{
    const projects=await fetchProjects(userId);
    return projects
});

export const fetchProjectByIdAsync=createAsyncThunk("projects/fetchProjectsById",async(id)=>{
    const selectedProject=await fetchProjectById(id);
    return selectedProject
})

export const addProjectAsync=createAsyncThunk("projects/addProjectAsync",async(data)=>{
    const addedProject=await addProject(data)
    return addedProject
})
const projectSlice=createSlice({
    name:"projectSlice",
    initialState:initialState,
    reducers:{
        clearProjectErrors:(state)=>{
            state.errors=null
        },
        clearProjectSuccessMessage:(state)=>{
            state.sucessMessage=null
        },
        resetProjectStatus:(state)=>{
            state.status='idle'
        },
        resetProjectFetchStatus:(state)=>{
            state.projectFetchStatus='idle'
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProjectAsync.pending,(state)=>{
                state.projectFetchStatus='loading'
            })
            .addCase(fetchProjectAsync.fulfilled,(state,action)=>{
                state.projectFetchStatus="fulfilled"
                state.projects=action.payload.data
            })
            .addCase(fetchProjectAsync.rejected,(state,action)=>{
                state.projectFetchStatus="rejected"
                state.errors=action.error
            })
            .addCase(fetchProjectByIdAsync.pending,(state)=>{
                state.projectFetchStatus="loading"
            })
            .addCase(fetchProjectByIdAsync.fulfilled,(state,action)=>{
                state.projectFetchStatus="fulfilled"
                state.selectedProject=action.payload
            })
            .addCase(fetchProjectByIdAsync.rejected,(state,action)=>{
                state.projectFetchStatus="rejected"
                state.errors=action.error
            })
            .addCase(addProjectAsync.pending,(state,action)=>{
                state.projectAddStatus="pending"
            })
            .addCase(addProjectAsync.fulfilled,(state,action)=>{
                state.projectAddStatus="fulfilled"
                state.projects.push(action.payload)
            })
            .addCase(addProjectAsync.rejected,(state,action)=>{
                state.projectAddStatus="rejected"
                state.errors=action.error
            })
    }
})

export const {
    clearProjectErrors,
    clearProjectSuccessMessage,
    resetProjectStatus,
    resetProjectFetchStatus
} = projectSlice.actions;

export default projectSlice.reducer;