import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import GoogleLogo from "@/assets/google.svg"

function SignUp() {

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data from form : ", form);
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
                    <CardContent className="pt-6 pb-6 rounded-none">
                        <h1 className="text-center text-4xl font-bold mb-1 text-white tracking-tight">Lume</h1>
                        <p className="text-center text-md text-zinc-400 mb-6">Sign up to see photos and videos from your friends.</p>

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

                        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
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
                                id="username"
                                name="username"
                                type="text"
                                value={form.username}
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
                                className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-dm placeholder:text-zinc-400 h-10"
                            />

                            <div className="flex flex-wrap justify-center items-center gap-1 text-sm text-zinc-400">
                                <p className="mb-0">By signing up, you agree to our</p>
                                <a href="" className="text-blue-500 hover:underline">Terms</a>
                                <p className="mb-0">,</p>
                                <a href="" className="text-blue-500 hover:underline">Privacy Policy</a>
                                <p className="mb-0">, and </p>
                                <a href="" className="text-blue-500 hover:underline">Cookies Policy</a>
                            </div>


                            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                                Sign Up
                            </Button>

                            <CardFooter className="justify-center text-sm text-zinc-400 border-t border-zinc-800 py-4 rounded-none">
                                Have an Account?{" "}
                                <a href="/sigin" className="ml-1 font-medium text-md text-blue-500 hover:underline">Log In</a>
                            </CardFooter>
                        </form>
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