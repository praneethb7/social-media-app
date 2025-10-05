// import { useSelector } from "react-redux";
import useCurrentUser from "@/hooks/useCurrentUser";
// import type { RootState } from "@/redux/store";
import Nav from "@/components/Nav";
import { SparklesCore } from "@/components/ui/sparkles";
import { useMemo } from "react";
import LeftHome from "@/components/LeftHome";



const Home = () => {
  useCurrentUser();
  // const { userData } = useSelector((state: RootState) => state.user);

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
    <div className="min-h-screen bg-black flex relative">

      {sparkles}

      <div className="z-20 flex-none">
        <LeftHome />
      </div>

      <Nav />
    </div>

  );
};

export default Home;
