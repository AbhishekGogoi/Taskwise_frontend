import { axiosi } from "../../config/axios";

export const fetchProjects=async(userId)=>{
    try{
        const res=await axiosi.get(`/workspaces/user/${userId}/projects`);
        return {data:res.data}
    }catch(error){
        throw error.response.data
    }
}
export const fetchProjectById=async(id)=>{
    try{
        const res=await axiosi.get(`/projects/${id}`);
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const addProject=async(data)=>{
    try{
        const res=await axiosi.post(`/projects`,data);
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const addTask=async(data,id)=>{
    try{
        const res=await axiosi.post(`/projects/6655840c9d6b2d09cfbbde15/tasks`,data);
        return res.data
    }catch(error){
        throw error.response.data
    }
}

export const moveTask=async(data,idObject)=>{
    const { id, taskId } = idObject;
    try{
        const res=await axiosi.put(`/projects/${id}/tasks/${taskId}/move`,data)
        return res.data
    }catch(error){
        throw error.response.data
    }
}