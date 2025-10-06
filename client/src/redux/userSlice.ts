import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface User {
  _id: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  profileImage: string;
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
  profileData: User | null;
  suggestedUsers: User | null;
}

const initialState: UserState = {
  userData: null,
  profileData: null,
  suggestedUsers: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
    // clearUser: (state) => {
    //   state.userData = null;
    // },
    setProfileData: (state, action: PayloadAction<User | null>) => {
      state.profileData = action.payload
    },
    setSuggestedUsers:(state,action: PayloadAction<User | null>) => {
       state.suggestedUsers = action.payload
    }
  },
});

export const { setUserData, setProfileData, setSuggestedUsers } = userSlice.actions;
export default userSlice.reducer;
