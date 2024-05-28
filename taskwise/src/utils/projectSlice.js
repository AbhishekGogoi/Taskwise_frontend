import { createSlice } from "@reduxjs/toolkit";

const projectSlice=createSlice({
    name:"project",
    initialState:{
        projects:["hiiii"],
    },
    reducers:{
        addProject:(state,action)=>{
            state.projects.push(action.payload)
        },
        removeProject:(state,action)=>{
            state.projects.pop()
        }
    }
});

export const { addProject, removeProject} =projectSlice.actions;

export default projectSlice.reducer;