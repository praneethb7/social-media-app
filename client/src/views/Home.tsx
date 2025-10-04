import { useSelector } from "react-redux";
import useCurrentUser from "@/hooks/useCurrentUser";
import type { RootState } from "@/redux/store";
import Nav from "@/components/Nav";
import { SparklesCore } from "@/components/ui/sparkles";
import { useMemo } from "react";



const Home = () => {
  useCurrentUser();
  const { userData } = useSelector((state: RootState) => state.user);

  const sparkles = useMemo(() => (
    <SparklesCore
      id="tsparticles"
      background="transparent"
      minSize={0.9}
      maxSize={1.5}
      particleDensity={30}
      className="absolute inset-0 w-full h-full pointer-events-none"
      particleColor="#E1306C"
    />
  ), []);

  return (
    <div className="min-h-screen bg-black relative">
     
      {sparkles}
     <p className="text-white text-xl font-semibold p-[10px]">{userData?.userName}</p>
     <p className="text-white text-xl font-semibold p-[10px]">{userData?.name ?? "Guest"}</p>
    <Nav/>
    </div>
   
  );
};

export default Home;
