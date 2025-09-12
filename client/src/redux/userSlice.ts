import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface User {
  _id: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: string[];
  reels: string[];
  story: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserState {
  userData: User | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
