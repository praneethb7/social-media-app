import { getSuggestions } from "@/apiCalls/userCalls";
import type { RootState } from "@/redux/store";
import { setSuggestedUsers } from "@/redux/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function getSuggestedUsers() {
    const dispatch = useDispatch()
    const {userData} = useSelector((state:RootState)=>state.user)
    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                const result = await getSuggestions()
                dispatch(setSuggestedUsers(result))
            } catch(e:any){
                console.log(e)
            }
        }
        fetchUser()
    },[userData])
}

export default getSuggestedUsers;