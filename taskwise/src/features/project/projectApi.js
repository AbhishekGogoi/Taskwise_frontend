import { axiosi } from "../../config/axios";

export const fetchProjects=async()=>{
    try{
        const res=await axiosi.get(`/workspaces/user/6654807dec9a0c3fa996f002/projects`);
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