import axios from "axios";
import { API_BASE_URL } from "./config";
import type { User } from "@/redux/userSlice";
import { Trophy } from "lucide-react";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

export const followUser = async(userId:string) => {
    try{
        const response = await api.post(`/api/follow/${userId}`,{},{withCredentials:true});
        return response.data
    } catch(e:any){
        throw e.response?.data?.message || "Faileed to Follow";
    }
}

export const unfollowUser = async(userId:string) =>{
    try{
        const response = await api.post(`/api/follow/unfollow/${userId}`,{},{withCredentials:true});
        return response.data;
    } catch(e:any){
        throw e.response?.data?.message || "Faileed to Unfollow";
    }
}

export const getFollowStatus = async(userId:string)=>{
    try{
        const response = await api.get(`/api/follow/status/${userId}`,{withCredentials:true});
        return response.data;
    } catch(e:any){
         throw e.response?.data?.message || "Faileed to get status";
    }
}