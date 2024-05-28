import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { fetchProjects } from "./projectAPI";

const initialState={
    projects:[],
    projectFetchStatus: 'idle',
    status:"idle",
    errors:null,
    sucessMessage:null
}

export const fetchProjectAsync=createAsyncThunk("projects/fetchProjects",async()=>{
    const projects=await fetchProjects();
    return projects
});

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
    }
})

export const {
    clearProjectErrors,
    clearProjectSuccessMessage,
    resetProjectStatus,
    resetProjectFetchStatus
} = projectSlice.actions;

export default projectSlice.reducer;