import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPostData } from "@/redux/postSlice.ts"; 
import type { AppDispatch } from "@/redux/store.ts";


import { getAllPosts } from "@/apiCalls/postCalls.ts"; 

function usePostData() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getAllPosts();
        
        const posts = "posts" in result ? result.posts : result;
        dispatch(setPostData(posts));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        dispatch(setPostData([]));
      }
    };

    fetchPosts();
  }, [dispatch]);
}

export default usePostData;