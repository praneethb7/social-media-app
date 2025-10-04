import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "@/apiCalls/userCalls";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { setProfileData } from "@/redux/userSlice";
import { SparklesCore } from "@/components/ui/sparkles";
import LeftHome from "@/components/LeftHome";
import { Edit } from "lucide-react";
import { motion } from "motion/react";



function Profile() {
  const { userName } = useParams<{ userName: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const { profileData } = useSelector((state: RootState) => state.user)
  console.log(profileData)

  async function handleProfile() {
    try {
      if (!userName) return;
      const userResult = await getProfile(userName);

      dispatch(setProfileData(userResult));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleProfile();
  }, [userName, dispatch]);

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


      <div className="flex-1 flex flex-col items-center ml-8 mt-8 space-y-8">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 relative z-10 bg-black px-15 py-15 flex flex-row items-start rounded-3xl shadow-md max-w-4xl w-full h-auto"
        >

          {profileData?.profileImage && (
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="w-42 h-42 rounded-full object-cover border-4 border-gray-800"
            />
          )}


          <div className="ml-8 flex flex-col justify-start flex-1">

            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-white text-2xl font-semibold">
                  {profileData?.userName || "Username"}
                </h1>
                <h1 className="text-slate-200 mt-1">{profileData?.name}</h1>
              </div>
              <Link
                to="/editprofile"
                className="ml-7 mt-1 px-4 py-1 border border-gray-700 rounded-md text-white hover:bg-stone-900 transition"
              >
                Edit Profile
              </Link>
              <Link
                to="/editprofile"
                className="ml-[-10px] mt-1 px-4 py-1 border border-gray-700 rounded-md text-white hover:bg-stone-900 transition"
              >
                <Edit />
              </Link>
            </div>

            =
            <div className="flex space-x-8 mt-7 text-white text-sm">
              <div className="flex flex-row items-center">
                <span className="font-bold text-lg mr-3">
                  {Array.isArray(profileData?.posts) ? profileData.posts.length : 0}
                </span>
                <span className="text-gray-400 text-lg">Posts</span>
              </div>
              <div className="flex flex-row items-center">
                <span className="font-bold text-lg mr-3">
                  {Array.isArray(profileData?.followers) ? profileData.followers.length : 0}
                </span>
                <span className="text-gray-400 text-lg">Followers</span>
              </div>
              <div className="flex flex-row items-center">
                <span className="font-bold text-lg mr-3">
                  {Array.isArray(profileData?.following) ? profileData.following.length : 0}
                </span>
                <span className="text-gray-400 text-lg">Following</span>
              </div>
            </div>


            {profileData?.bio && (
              <p className="mt-5 text-gray-300 max-w-lg">{profileData.bio}</p>
            )}
          </div>
        </motion.div>


        <div className="w-full max-w-4xl ">
          <h1 className="text-white text-2xl mb-4">POSTS</h1>

          <div className="bg-gray-800 h-32 w-full rounded-lg mb-4"></div>
          <div className="bg-gray-800 h-32 w-full rounded-lg mb-4"></div>
          <div className="bg-gray-800 h-32 w-full rounded-lg mb-4"></div>
        </div>
      </div>
    </div>

  )
}
export default Profile;