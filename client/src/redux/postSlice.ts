import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface Post {
  _id: string;
  caption?: string;
  imageUrl?: string;
  type?: "post" | "story" | "reel";
  createdAt?: string;
  [key: string]: any; 
}

interface PostState {
  postData: Post[];
}

const initialState: PostState = {
  postData: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostData: (state, action: PayloadAction<Post[]>) => {
      state.postData = action.payload;
  },

    updatePost: (state, action: PayloadAction<Post>) => {
      const updatedPost = action.payload;
      const index = state.postData.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (index !== -1) {
        state.postData[index] = updatedPost;
      }
    },
  },
});

export const { setPostData, updatePost } = postSlice.actions;
export default postSlice.reducer;
