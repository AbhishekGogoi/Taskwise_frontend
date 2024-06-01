import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import { fetchProjects, fetchProjectById, addProject, addTask, moveTask,addColumn, editColumn, editTask } from "./projectApi";


const initialState={
    projects:[],
    projectFetchStatus: 'idle',
    projectAddStatus:"idle",
    selectedProject:null,
    status:"idle",
    errors:null,
    sucessMessage:null,
    taskAddStatus:"idle",
    taskMoveStatus:"idle",
    columnAddStatus:"idle",
    columnEditStatus:"idle",
    taskEditStatus:"idle"
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

export const addColumnAsync=createAsyncThunk("projects/addColumnAsync",async({data,id})=>{
    const addedColumn=await addColumn(data,id);
    return addedColumn
})

export const editColumnAsync=createAsyncThunk("projects/editColumnAsync",async({data,idObject})=>{
    const editedColumn=await editColumn(data,idObject);
    return editedColumn
})

export const editTaskAsync=createAsyncThunk("projects/editTaskAsync",async({data,idObject})=>{
    const editedTask=await editTask(data,idObject);
    return editedTask
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
        },
        resetColumnAddStatus:(state) => {
            state.columnAddStatus="idle"
        },
        resetColumnEditStatus:(state)=>{
            state.columnEditStatus="idle"
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
            .addCase(addColumnAsync.pending,(state,action)=>{
                state.columnAddStatus="pending"
            })
            .addCase(addColumnAsync.fulfilled,(state,action)=>{
                state.columnAddStatus="fulfilled"
                state.selectedProject=action.payload
            })
            .addCase(addColumnAsync.rejected,(state,action)=>{
                state.columnAddStatus="rejected"
            })
            .addCase(editColumnAsync.pending,(state,action)=>{
                state.columnEditStatus="pending"
            })
            .addCase(editColumnAsync.fulfilled,(state,action)=>{
                state.columnEditStatus="fulfilled"
            })
            .addCase(editColumnAsync.rejected,(state,action)=>{
                state.columnEditStatus="rejected"
            })
            .addCase(editTaskAsync.pending,(state,action)=>{
                state.taskEditStatus="pending"
            })
            .addCase(editTaskAsync.fulfilled,(state,action)=>{
                state.taskEditStatus="fulfilled";
                state.selectedProject=action.payload;
            })
            .addCase(editTaskAsync.rejected,(state,action)=>{
                state.taskEditStatus="rejected"
            })
    }
})

export const {
    clearProjectErrors,
    clearProjectSuccessMessage,
    resetProjectStatus,
    resetProjectFetchStatus,
    resetTaskAddStatus,
    resetProjectAddStatus,
    resetColumnAddStatus,
    resetColumnEditStatus
} = projectSlice.actions;

export default projectSlice.reducer;