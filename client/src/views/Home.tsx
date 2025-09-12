import { useSelector } from "react-redux";
import useCurrentUser from "@/hooks/useCurrentUser";
import type { RootState } from "@/redux/store";


const Home = () => {
  useCurrentUser();
  const { userData } = useSelector((state: RootState) => state.user);

  return (
    <p>{userData?.name ?? "Guest"}</p>
  );
};

export default Home;
