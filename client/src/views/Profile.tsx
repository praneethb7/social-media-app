import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProfile } from "@/apiCalls/userCalls";
import { followUser, unfollowUser, getFollowStatus } from "@/apiCalls/followCalls";
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
  const navigate = useNavigate();

  const { profileData, userData } = useSelector((state: RootState) => state.user);
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const isOwnProfile = userData?.userName === userName;

  async function handleProfile() {
    try {
      if (!userName) return;
      const userResult = await getProfile(userName);
      dispatch(setProfileData(userResult));
      setFollowersCount(userResult.followers?.length || 0);

      // Check follow status if not own profile
      if (!isOwnProfile && userResult._id) {
        const statusResult = await getFollowStatus(userResult._id);
        setIsFollowing(statusResult.isFollowing);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFollowToggle = async () => {
    if (!profileData?._id || followLoading) return;

    setFollowLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(profileData._id);
        setIsFollowing(false);
        setFollowersCount((prev) => prev - 1);
      } else {
        await followUser(profileData._id);
        setIsFollowing(true);
        setFollowersCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Follow toggle error:", error);
      alert("Failed to update follow status");
    } finally {
      setFollowLoading(false);
    }
  };

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
              
              
              {isOwnProfile && (
                <>
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
                </>
              )}

              
              {!isOwnProfile && (
                <>
                  <button
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                    className={`
                      ml-7 mt-1 px-6 py-1 rounded-md font-semibold transition
                      ${
                        isFollowing
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-[#E1306C] text-white hover:bg-[#C13584]"
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                      min-w-[100px]
                    `}
                  >
                    {followLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
                  </button>

                  <button
                    onClick={() =>
                      navigate("/messages", {
                        state: { selectedUser: profileData },
                      })
                    }
                    className="px-4 py-1 bg-gray-700 rounded-md text-white hover:bg-gray-600 transition"
                  >
                    Message
                  </button>
                </>
              )}
            </div>

            <div className="flex space-x-8 mt-7 text-white text-sm">
              <div className="flex flex-row items-center">
                <span className="font-bold text-lg mr-3">
                  {Array.isArray(profileData?.posts) ? profileData.posts.length : 0}
                </span>
                <span className="text-gray-400 text-lg">Posts</span>
              </div>
              <div className="flex flex-row items-center">
                <span className="font-bold text-lg mr-3">
                  {followersCount}
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

        <div className="w-full max-w-4xl">
          <h1 className="text-white text-2xl mb-4">POSTS</h1>
          <div className="bg-gray-800 h-32 w-full rounded-lg mb-4"></div>
          <div className="bg-gray-800 h-32 w-full rounded-lg mb-4"></div>
          <div className="bg-gray-800 h-32 w-full rounded-lg mb-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;