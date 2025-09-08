import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./views/auth/signin"
import SignUp from "./views/auth/signup"
import Landing from "./views/Landing"
import { Home } from "lucide-react"
import ForgotPassword from "./views/auth/ForgotPassword"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
