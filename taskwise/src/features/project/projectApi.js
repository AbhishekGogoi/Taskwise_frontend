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