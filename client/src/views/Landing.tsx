import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { SparklesCore } from "@/components/ui/sparkles"
import LogoNSQ from "@/assets/LUME NSQ.jpg"
import LogoSQ from "@/assets/LUME SQ.png"
import { Link } from "react-router-dom"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"

function Landing() {

  const words = [
    {
      text: "See",
      className:"text-4xl"
    },
    {
      text: "everyday",
      className:"text-4xl"
    },
    {
      text: "moments",
      className:"text-4xl"
    },
    {
      text: "from",
      className:"text-4xl"
    },
    {
      text: "your",
      className: "text-4xl text-[#E1306C]",
    },
    {
      text: "friends.",
      className: "text-4xl text-[#E1306C]",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      
      <header className="w-full">
        <div className="max-w-8xl mx-auto flex items-center justify-between px-20 py-2">
         
          <div className="flex items-center gap-2">
            <img src={LogoNSQ} alt="Logo" className="w-[60px] rounded-sm" />
            <p className="font-bold text-xl tracking-wide">THE Social Media</p>
          </div>

         
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-5">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link  to="/signin" className="text-white hover:bg-zinc-700 hover:text-white">
                    Sign In
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link  to="/signup" className="text-white hover:bg-zinc-700 hover:text-white">
                    Sign Up
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <div className="flex flex-row items-center justify-center mt-20 px-6 mr-50">
        <SparklesCore
            id="tsparticles"
            background="transparent"
            minSize={0.9}
            maxSize={1.5}
            particleDensity={30}
            className="absolute inset-0 w-full h-full pointer-events-none"
            particleColor="#E1306C"
          />
        <img src={LogoSQ} className="relative z-10"/>
        <div className="flex flex-col items-center justify-center relative">
          <TypewriterEffectSmooth words={words}/>
            {/* <h1 className="text-4xl mb-2">See everyday moments from</h1>
            <h1 className="text-4xl text-[#E1306C]">your friends.</h1> */}
            <div className="flex flex-row items-center justify-center">
            <Link to="/signup" className="mt-9 bg-[#C13584] py-2 px-2 rounded-lg mr-15">Get Started</Link>
            <Link to="/signin" className="mt-9 bg-[#E1306C] py-2 px-6 rounded-lg">Sign In</Link>
            </div>
        </div>
      </div>
      <footer className="w-full py-4 text-center text-sm text-zinc-400 absolute bottom-5">
        © 2025 Lume. Made by Praneeth with 🩷
      </footer>
    </div>
  )
}

export default Landing
