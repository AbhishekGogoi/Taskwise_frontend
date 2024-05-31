import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { fetchProjects, fetchProjectById, addProject, addTask, moveTask } from "./projectApi";


const initialState={
    projects:[],
    projectFetchStatus: 'idle',
    projectAddStatus:"idle",
    selectedProject:null,
    status:"idle",
    errors:null,
    sucessMessage:null,
    taskAddStatus:"idle",
    taskMoveStatus:"idle"
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

export const addTaskAsync=createAsyncThunk("projects/addTaskAsync",async({task,id})=>{
    const addedTask=await addTask(task,id)
    return addedTask
})

export const moveTaskAsync=createAsyncThunk("projects/moveTaskAsync",async({ data, idObject })=>{
    const movedTask=await moveTask(data,idObject)
    return movedTask
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
        },
        resetTaskAddStatus: (state) => {
            state.taskAddStatus = 'idle';
        },
        resetProjectAddStatus:(state) => {
            state.projectAddStatus="idle"
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
            .addCase(addTaskAsync.pending,(state,action)=>{
                state.taskAddStatus="pending"
            })
            .addCase(addTaskAsync.fulfilled,(state,action)=>{
                state.taskAddStatus="fulfilled"
                state.selectedProject.tasks.push(action.payload)
            })
            .addCase(addTaskAsync.rejected,(state,action)=>{
                state.taskAddStatus="rejected"
                state.errors=action.error
            })
            .addCase(moveTaskAsync.pending,(state,action)=>{
                state.taskMoveStatus="pending"
                state.projectFetchStatus="loading"
            })
            .addCase(moveTaskAsync.fulfilled,(state,action)=>{
                state.taskMoveStatus="fulfilled"
                state.projectFetchStatus="idle"
                //state.selectedProject=action.payload
            })
            .addCase(moveTaskAsync.rejected,(state,action)=>{
                state.taskMoveStatus="rejected"
            })
    }
})

export const {
    clearProjectErrors,
    clearProjectSuccessMessage,
    resetProjectStatus,
    resetProjectFetchStatus,
    resetTaskAddStatus,
    resetProjectAddStatus
} = projectSlice.actions;

export default projectSlice.reducer;