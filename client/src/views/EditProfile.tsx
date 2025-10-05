import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfileData, setUserData } from "../redux/userSlice";
import type { RootState, AppDispatch } from "@/redux/store";
import type { User } from "../redux/userSlice";
import { editProfile } from "@/apiCalls/userCalls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SparklesCore } from "@/components/ui/sparkles";
import LeftHome from "@/components/LeftHome";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";

function EditProfile() {
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const imageInput = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string>(userData?.profileImage || "");
  const [serverProfileImage, setServerProfileImage] = useState<File | null>(null);
  const [name, setName] = useState<string>(userData?.name || "");
  const [userName, setUserName] = useState<string>(userData?.userName || "");
  const [bio, setBio] = useState<string>(userData?.bio || "");

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    setServerProfileImage(file);
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("userName", userName);

      if (serverProfileImage) formData.append("profileImage", serverProfileImage);

      const result: User = await editProfile(formData);

      dispatch(setProfileData(result));
      dispatch(setUserData(result));

      setMessage("Profile Saved.");
      setError("");

    } catch (err) {
      console.error(err);
      setError("Failed to Update.");
      setMessage("");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setError("");
        navigate("/home")
      }, 1000);
    }
  };

  const handleDiscard = async () => {
    setError("Changes Discarded");
    setTimeout(() => {
      
      navigate("/home")
    }, 1000)

  }

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
    

    <div className="min-w-4xl mx-60 min-h-screen bg-black relative flex items-center px-4">
     

      <div className="w-full max-w-2xl bg-black rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button onClick={()=>navigate("/home")} className="text-white cursor-pointer w-7 h-7"><ChevronLeft className="w-7 h-7"/></Button>
          <h1 className="text-2xl font-semibold text-white">Edit Profile</h1>
        </div>


        {/* Profile Image */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-2 border-gray-700 shadow cursor-pointer group"
            onClick={() => imageInput.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={imageInput}
              hidden
              onChange={handleImage}
            />
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium transition">
              Change
            </div>
          </div>
          <button
            onClick={() => imageInput.current?.click()}
            className="text-blue-500 text-sm font-semibold hover:underline"
          >
            Change Profile Picture
          </button>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <Label className="text-stone-300 mb-[-15px]">name:</Label>
          <Input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-white focus:ring-1 focus:ring-stone-900 ring-none"
          />
          <Label className="text-stone-300 mb-[-15px]">username:</Label>
          <Input
            type="text"
            placeholder="Enter Your Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="text-white focus:ring-1 focus:ring-stone-900 ring-none"
          />
          <Label className="text-stone-300 mb-[-15px]">user bio:</Label>
          <Textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="text-white focus:ring-1 focus:ring-stone-900 ring-none"
          />
        </div>

        <div className="flex flex-row items-center space-x-10">
          <Button
            onClick={handleEditProfile}
            className="bg-[#E1306C] hover:bg-[#C13584]"
          >{loading ? <Loader2 className="min-w-20 h-5 animate-spin" /> : "Save Profile" }</Button>
          <Button className="bg-red-800 hover:bg-red-900" onClick={handleDiscard}>Discard</Button>
        </div>

      </div>
      {message && (
        <div className="min-w-screen fixed bottom-0 py-2 left-1/2 -translate-x-1/2 bg-stone-600 text-white text-center shadow-lg text-sm font-medium transition-all duration-300">{message}</div>
      )}
      {error && (
        <div className="min-w-screen fixed bottom-0 left-1/2 -translate-x-1/2 py-2 bg-red-900 text-white text-center shadow-lg text-sm font-medium transition-all duration-300">{error}</div>
      )}
    </div>
    </div>
  );
}

export default EditProfile;
