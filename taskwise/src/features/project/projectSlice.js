import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { fetchProjects, fetchProjectById } from "./projectApi";

const initialState={
    projects:[],
    projectFetchStatus: 'idle',
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
    }
})

export const {
    clearProjectErrors,
    clearProjectSuccessMessage,
    resetProjectStatus,
    resetProjectFetchStatus
} = projectSlice.actions;

export default projectSlice.reducer;