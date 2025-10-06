import { useSelector } from "react-redux";
import useCurrentUser from "@/hooks/useCurrentUser";
import Nav from "@/components/Nav";
import { SparklesCore } from "@/components/ui/sparkles";
import { useMemo, useState } from "react";
import LeftHome from "@/components/LeftHome";
import type { RootState } from "@/redux/store";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import usePostData from "@/hooks/usePostData";
import { likePost } from "@/apiCalls/postCalls";
import { useDispatch } from "react-redux";
import { updatePost } from "@/redux/postSlice";

const Home = () => {
  useCurrentUser();
  usePostData();

  const { postData } = useSelector((state: RootState) => state.post);
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [likingPostId, setLikingPostId] = useState<string | null>(null);
  
  const sparkles = useMemo(
    () => (
      <SparklesCore
        id="tsparticles"
        background="transparent"
        minSize={0.9}
        maxSize={1.5}
        particleDensity={30}
        className="absolute inset-0 w-full h-full pointer-events-none"
        particleColor="#E1306C"
      />
    ),
    []
  );

  // Dummy suggestions data
  const suggestions = [
    { id: 1, username: "alex_photo", name: "Alex Johnson", image: "/defaultProfile.png" },
    { id: 2, username: "sara_designs", name: "Sara Smith", image: "/defaultProfile.png" },
    { id: 3, username: "mike_travels", name: "Mike Chen", image: "/defaultProfile.png" },
    { id: 4, username: "emma_art", name: "Emma Wilson", image: "/defaultProfile.png" },
    { id: 5, username: "david_codes", name: "David Brown", image: "/defaultProfile.png" },
  ];

  const handleLike = async (postId: string) => {
    if (likingPostId === postId) return;
    setLikingPostId(postId);
    try {
      const updatedPost = await likePost(postId);
      dispatch(updatePost(updatedPost));
    } catch (e) {
      console.error(e);
    } finally {
      setLikingPostId(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex overflow-hidden">
      {sparkles}
      
      {/* Left Sidebar */}
      <div className="flex-none z-20">
        <LeftHome />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center gap-50 px-4 overflow-y-auto scrollbar-hide pb-24 mt-10">
        {/* Feed Section - Centered */}
        <div className="flex-none w-[470px] flex flex-col z-20">
          {postData && postData.length > 0 ? (
            postData.map((post, index) => {
              // Check if current user has liked this post
              const isLiked = post.likes?.some((id:string) => id === userData?._id);
              const isLiking = likingPostId === post._id;

              return (
                <div
                  key={index}
                  className="w-full bg-stone-950 border border-neutral-800 rounded-xl p-4 mb-6 shadow-lg"
                >
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-[40px] h-[40px] rounded-full bg-neutral-700 overflow-hidden">
                      <img
                        src={post.author?.profileImage || "/defaultProfile.png"}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">
                        {post.author?.userName || "Unknown User"}
                      </p>
                      <p className="text-xs text-neutral-400">2 hrs ago</p>
                    </div>
                  </div>

                  {/* Post Media */}
                  <div className="w-full h-[500px] bg-neutral-800 rounded-lg mb-3 overflow-hidden">
                    {post.mediaType === "image" ? (
                      <img
                        src={post.mediaUrl}
                        alt="post"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={post.mediaUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 mb-2 text-[22px] text-white">
                    <button
                      className="flex items-center gap-1 transition-all cursor-pointer"
                      disabled={isLiking}
                      onClick={() => handleLike(post._id)}
                    >
                      {isLiked ? (
                        <AiFillHeart className="text-red-500" />
                      ) : (
                        <AiOutlineHeart className="hover:text-red-500" />
                      )}
                    </button>
                    <BiComment className="cursor-pointer hover:text-blue-500 transition" />
                    <BsBookmark className="cursor-pointer hover:text-green-500 transition ml-auto" />
                  </div>

                  {/* Like Count */}
                  <p className="text-sm text-white font-semibold mb-1">
                    {post.likes?.length || 0} likes
                  </p>

                  {/* Caption */}
                  <p className="text-sm text-neutral-200">{post.caption}</p>
                </div>
              );
            })
          ) : (
            <p className="text-neutral-400 text-center mt-20">No posts available</p>
          )}
        </div>

        {/* Right Sidebar - Suggestions */}
        <div className="flex-none w-[320px] mt-4 hidden lg:block z-20">
          <div className="sticky top-4">
            {/* Suggestions Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-neutral-400 font-semibold text-sm">
                Suggested for you
              </h2>
              <button className="text-white text-xs font-semibold hover:text-neutral-300">
                See All
              </button>
            </div>

            {/* Suggestions List */}
            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[44px] h-[44px] rounded-full bg-neutral-700 overflow-hidden">
                      <img
                        src={suggestion.image}
                        alt={suggestion.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {suggestion.username}
                      </p>
                      <p className="text-neutral-400 text-xs">
                        {suggestion.name}
                      </p>
                    </div>
                  </div>
                  <button className="text-blue-500 text-xs font-semibold hover:text-blue-400">
                    Follow
                  </button>
                </div>
              ))}
            </div>

            <p className="text-white font-sm mt-2">© 2025 LUME</p>
          </div>
        </div>
      </div>

      {/* Bottom Floating Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pb-4">
        <div className="w-fit">
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Home;