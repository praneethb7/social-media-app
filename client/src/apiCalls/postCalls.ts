import axios from "axios";
import { API_BASE_URL } from "./config";


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

export const createPost = async (formData:FormData)=>{
    try {
    const response = await api.post(`/api/post/upload/`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error:any) {
    throw error.response?.data?.message || "Failed to fetch user data";
  } 
}


export const getAllPosts = async ()=>{
    try {
    const response = await api.get(`/api/post/getAllPosts`,  {
      withCredentials: true,
    });
    return response.data;
  } catch (error:any) {
    throw error.response?.data?.message || "Failed to fetch Posts";
  } 
}

export const likePost = async(postId:string)=>{
  try{
    const response = await api.post(`/api/post/like/${postId}`,  {}, { withCredentials: true })
    return response.data;
  } catch(e:any){
     throw e.response?.data?.message || "Failed to Like"
  }
}