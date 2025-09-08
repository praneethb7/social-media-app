import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import GoogleLogo from "@/assets/google.svg"
import { Link } from "react-router-dom"
import Logo1 from "@/assets/LUME NSQ.jpg";
import { signUp } from "@/apiCalls/authCalls";
import { useNavigate } from "react-router-dom"

interface FormData {
  name: string;
  userName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    const { name, userName, email, password } = form;
    console.log(form)

    if (!name || !userName || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await signUp(form);
      console.log("Sign Up Successful", response);
      navigate("/home")
      // Clear the form
      setForm({ name: "", userName: "", email: "", password: "" });
    } catch (error) {
      console.error("Error during sign up", error);
      alert("Sign Up Failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[350px]"
      >
        <Card className="bg-black border border-zinc-800 rounded-sm shadow-xl">
          <CardContent className="pt-6 pb-6 rounded-none">
            <img className="mx-auto my-0" src={Logo1} alt="Logo" />
            <p className="text-center text-md text-zinc-400 mb-6">
              Sign up to see photos and videos from your friends.
            </p>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100"
            >
              <img src={GoogleLogo} alt="Google logo" className="w-5 h-5" />
              Sign Up with Google
            </Button>

            <div className="relative my-6">
              <Separator className="bg-zinc-700" />
              <span className="absolute left-1/2 top-[-10px] -translate-x-1/2 bg-black px-2 text-sm text-zinc-400">
                OR
              </span>
            </div>

            
            <div className="flex flex-col space-y-3">
              <Input
                id="name"
                name="name"
                type="text"
                value={form.name}
                placeholder="Full Name"
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-sm placeholder:text-zinc-400 h-10"
              />

              <Input
                id="userName"
                name="userName"
                type="text"
                value={form.userName}
                placeholder="Username"
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-sm placeholder:text-zinc-400 h-10"
              />

              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                placeholder="Email"
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-sm placeholder:text-zinc-400 h-10"
              />

              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                placeholder="Password"
                onChange={handleChange}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-sm placeholder:text-zinc-400 h-10"
              />

              <div className="flex flex-wrap justify-center items-center gap-1 text-sm text-zinc-400">
                <p className="mb-0">By signing up, you agree to our</p>
                <a href="" className="text-blue-500 hover:underline">Terms</a>
                <p className="mb-0">,</p>
                <a href="" className="text-blue-500 hover:underline">Privacy Policy</a>
                <p className="mb-0">, and</p>
                <a href="" className="text-blue-500 hover:underline">Cookies Policy</a>
              </div>

              
              <Button
                onClick={handleSignUp}
                onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Sign Up
              </Button>

              <CardFooter className="justify-center text-sm text-zinc-400 border-t border-zinc-800 py-4 rounded-none">
                Have an Account?{" "}
                <Link to="/signin" className="ml-1 font-medium text-blue-500 hover:underline">
                  Log In
                </Link>
              </CardFooter>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <footer className="w-full py-4 text-center text-sm text-zinc-400 absolute bottom-0">
        © 2025 Lume. Made by Praneeth with 🩷
      </footer>
    </div>
  )
}

export default SignUp;
