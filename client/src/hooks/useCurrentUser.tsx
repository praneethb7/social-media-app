import { useEffect } from "react";
import { getCurrentUser } from "@/apiCalls/userCalls";
import { useDispatch } from "react-redux";
import { setUserData } from "@/redux/userSlice";
import type { AppDispatch } from "@/redux/store";
import type { User } from "@/redux/userSlice";

function useCurrentUser() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getCurrentUser();

        const normalized: User =
          "user" in result ? result.user : result;

        dispatch(setUserData(normalized));
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useCurrentUser;
