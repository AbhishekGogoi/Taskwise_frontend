import { axiosi } from "../../config/axios";

export const signUp = async (cred) => {
  try {
    const res = await axiosi.post(`/auth/register`, cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (cred) => {
  try {
    const res = await axiosi.post(`/auth/login`, cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const logout = async () => {
  try {
    const res = await axiosi.post(`/auth/logout`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
