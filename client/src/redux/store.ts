import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postRecuer from "./postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postRecuer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
