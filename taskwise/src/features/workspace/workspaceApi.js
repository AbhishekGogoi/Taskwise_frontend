import { axiosi } from "../../config/axios";

export const fetchWorkspaceByUserID=async(userId)=>{
    try{
        const res=await axiosi.get(`/workspaces/user/${userId}/workspaces`);
        return {data:res.data}
    }catch(error){
        throw error.response.data
    }
}

export const createWorkspace = async (newWorkspace) => {
    try {
      const res = await axiosi.post(`/workspaces`, newWorkspace);
      return { data: res.data };
    } catch (error) {
      throw error.response.data;
    }
  };
  