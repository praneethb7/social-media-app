import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import GoogleLogo from "@/assets/google.svg"
import { Link } from "react-router-dom"
import Logo1 from "@/assets/LUME NSQ.jpg";
import { signIn } from "@/apiCalls/authCalls"
import { useNavigate } from "react-router-dom"

interface FormData {
  userName: string;
  password: string;
}

export default function SignIn() {
  const [form, setForm] = useState<FormData>({ userName: "", password: "" })
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignIn = async() => {
    const { userName, password } = form;

    if(!userName || !password) {
      alert("Please Enter Username and Password");
      return;
    }

    try {
          const response = await signIn(form);
          console.log("Sign Up Successful", response);
          navigate("/home")
          // Clear the form
          setForm({ userName: "", password: "" });
        } catch (error) {
          console.error("Error during sign up", error);
          alert("Sign Up Failed. Please try again.");
        }

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[350px]"
      >
        <Card className="bg-black border border-zinc-800 rounded-sm shadow-xl">
          <CardContent className="pt-6 pb-6">

            <img className="mx-auto my-0" src={Logo1} alt="Logo"></img>
            <p className="text-center text-md text-zinc-400 mb-6">Log In to see photos and videos from your friends.</p>


            <div className="flex flex-col space-y-3">
              <Input
                id="userName"
                name="userName"
                type="text"
                placeholder="Username"
                value={form.userName}
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 h-10"
              />

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 h-10"
              />

              <Button
                onClick={handleSignIn}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                className="w-full bg-blue-500 hover:bg-blue-600">
                Log In
              </Button>
            </div>

            <div className="relative my-6">
              <Separator className="bg-zinc-700" />
              <span className="absolute left-1/2 top-[-10px] -translate-x-1/2 bg-zinc-900 px-2 text-sm text-zinc-400">
                OR
              </span>
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 border-zinc-700 text-zinc-100 hover:bg-zinc-200"
            >
              <img src={GoogleLogo} alt="Google logo" className="w-5 h-5" />
              Log In with Google
            </Button>
          </CardContent>

          <CardFooter className="justify-center text-sm text-zinc-400 border-t border-zinc-800 py-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="ml-1 font-medium text-blue-500 hover:underline">
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </motion.div>

      <footer className="w-full py-4 text-center text-sm text-zinc-400 absolute bottom-0">
        © 2025 Lume. Made by Praneeth with 🩷
      </footer>
    </div>
  )
}
