import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./views/auth/signin"
import SignUp from "./views/auth/signup"
import Landing from "./views/Landing"
import Home from "./views/Home"
import ForgotPassword from "./views/auth/ForgotPassword"
import useCurrentUser from "./hooks/useCurrentUser"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store";
import Profile from "./views/Profile"
import UploadPost from "./views/Upload"
import EditProfile from "./views/EditProfile"

function App() {
  useCurrentUser();
  const { userData } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={userData ? <Home /> : <SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/profile/:userName' element={<Profile/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
        <Route path='/upload' element={<UploadPost/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App
