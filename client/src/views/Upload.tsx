import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SparklesCore } from "@/components/ui/sparkles";
import { ChevronLeft, Upload, Video, Image, Clapperboard, Loader2 } from "lucide-react";
import LeftHome from "@/components/LeftHome";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost } from "@/apiCalls/postCalls";
import { setPostData } from "@/redux/postSlice";

function UploadPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadType, setUploadType] = useState<"post" | "story" | "reel">("post");
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [backendMedia, setBackendMedia] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.includes("image")) {
      setMediaType("image");
    } else if (file.type.includes("video")) {
      setMediaType("video");
    } else {
      setMediaType("");
    }

    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    setBackendMedia(file);
  };

  const handleUpload = async () => {
    if (!backendMedia) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("mediaType", mediaType);
      formData.append("mediaUrl", backendMedia);
      formData.append("caption", caption);

      const result = await createPost(formData);
      dispatch(setPostData(result));

      setCaption("");
      setPreview(null);
      setBackendMedia(null);
      navigate("/home");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-black flex relative">
      {sparkles}

      {/* Sidebar */}
      <div className="z-20 flex-none">
        <LeftHome />
      </div>

      {/* Main upload area */}
      <div className="min-w-4xl mx-auto min-h-screen bg-black relative flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-black rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-6 relative z-10">

          {/* Header */}
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/home")} className="text-white w-7 h-7 p-0">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-semibold text-white">Create Upload</h1>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            {["post", "story", "reel"].map((type) => (
              <Button
                key={type}
                variant={uploadType === type ? "default" : "outline"}
                className={`text-white ${
                  uploadType === type
                    ? "bg-pink-600 hover:bg-pink-700"
                    : "bg-transparent border-gray-700 hover:bg-gray-800"
                }`}
                onClick={() => setUploadType(type as any)}
              >
                {type === "post" && <Image className="w-4 h-4 mr-2" />}
                {type === "story" && <Clapperboard className="w-4 h-4 mr-2" />}
                {type === "reel" && <Video className="w-4 h-4 mr-2" />}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          {/* Upload box */}
          <div
            className="mt-6 border border-gray-700 rounded-xl flex flex-col items-center justify-center gap-4 py-12 cursor-pointer hover:bg-gray-900 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-10 h-10 text-pink-500" />
            <p className="text-gray-400 text-sm">
              Click to upload your {uploadType}
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
              accept={uploadType === "reel" ? "video/*" : "image/*"}
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="flex justify-center mt-4">
              {mediaType === "video" ? (
                <video
                  src={preview}
                  controls
                  className="w-full max-h-80 rounded-xl border border-gray-700"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full max-h-80 object-contain rounded-xl border border-gray-700"
                />
              )}
            </div>
          )}

          {/* Caption */}
          <Input
            type="text"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="text-white focus:ring-1 focus:ring-stone-900 ring-none"
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="ghost"
              className="bg-red-900 hover:bg-red-800 text-white"
              onClick={() => navigate("/home")}
            >
              Discard
            </Button>
            <Button
              disabled={loading}
              onClick={handleUpload}
              className="bg-pink-600 hover:bg-pink-700 text-white flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Uploading...
                </>
              ) : (
                <>Upload {uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}</>
              )}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UploadPost;
