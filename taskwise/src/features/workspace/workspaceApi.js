import { axiosi } from "../../config/axios";

export const fetchWorkspaceByUserID=async(userId)=>{
    try{
        const res=await axiosi.get(`/workspaces/user/${userId}/workspaces`);
        return {data:res.data}
    }catch(error){
        throw error.response.data
    }
}

export const fetchWorkspaceById=async(id)=>{
    try{
        const res=await axiosi.get(`/workspaces/${id}`);
        return {data:res.data}
    }catch(error){
        throw error.response.data
    }
}

export const fetchWorkspaceProjects=async(workspaceId)=>{
  try{
      const res=await axiosi.get(`/workspaces/${workspaceId}/projects`);
      return {data:res.data}
  }catch(error){
      throw error.response.data
  }
}

export const fetchWorkspaceMembers=async(workspaceId)=>{
  try{
      const res=await axiosi.get(`/workspaces/${workspaceId}/members`);
      return {data:res.data}
  }catch(error){
      throw error.response.data
  }
}

export const fetchWorkspaceTasks=async(workspaceId)=>{
  try{
      const res=await axiosi.get(`/workspaces/${workspaceId}/tasks`);
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

export const uploadFile = async (formData) => {
    try {
        const res = await axiosi.post(`/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        });
        return { data: res.data };
    } catch (error) {
        throw error.response.data;
    }
};

// Function to get the pre-signed URL for an image
export const getImageUrl = async (key) => {
    try {
        const res = await axiosi.get(`/get-image-url`, {
            params: { key }
        });
        return { data: res.data };
    } catch (error) {
        throw error.response.data;
    }
};

export const exitMember = async (workspaceId, userId) => {
    try {
        const res = await axiosi.patch(`/workspaces/${workspaceId}/members/${userId}/exit`);
        return { data: res.data };
    } catch (error) {
        throw error.response.data;
    }
};

export const updateMemberRole = async (workspaceId, adminUserId, userId, role) => {
    try {
      const response = await axiosi.patch(`/workspaces/members/role/${adminUserId}`, {
        workspaceId,
        userId,
        role,
      });
      return response.data;  // Return the response data
    } catch (error) {
      throw error.response.data;  // Throw the error response data
    }
  };

  export const addMember = async (workspaceId, adminUserId, memberEmails) => {
    try {
      const response = await axiosi.post(`/workspaces/${workspaceId}/user/${adminUserId}/members`, {
        memberEmails
      });
      return response.data;  // Return the response data
    } catch (error) {
      throw error.response.data;  // Throw the error response data
    }
  };

export const updateWorkspace = async (workspaceId, name, imgUrl, imgKey) => {
  try {
      const res = await axiosi.put(`/workspaces/${workspaceId}`, {
          name,
          imgUrl,
          imgKey
      });
      return { data: res.data };
  } catch (error) {
      throw error.response.data;
  }
};
