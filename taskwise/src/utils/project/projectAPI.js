import { axiosi } from "../../config/axios";

export const fetchProjects=async()=>{
    try{
        const res=await axiosi.get(`/workspaces`);
        return {data:res.data}
    }catch(error){
        throw error.response.data
    }
}