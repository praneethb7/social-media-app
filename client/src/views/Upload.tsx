import { createPost } from "@/apiCalls/postCalls";
import { useRef, useState } from "react"


function Upload() {

  const [uploadType, setUploadType] = useState("post");
  const [frontendMedia, setFrontendMedia] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [caption, setCaption] = useState("");
  const [backendMedia, setBackendMedia] = useState("");
  const [loading] = useState(false);

  const mediaInput = useRef();

  const handleMedia = (e:any) => {
    const file = e.target.files[0]
    if(file?.type.includes('image')){
      setMediaType('image')
    }else if(file?.type.includes('video')){
      setMediaType('video')
    }else{
        setMediaType("");
    }

    const mediaUrl = URL.createObjectURL(file)
    setFrontendMedia(mediaUrl)
    setBackendMedia(file);
  }

  const uploadPost = async () => {
    try{
      const formData = new FormData();
      formData.append('mediaType',mediaType);
      formData.append('mediaUrl',backendMedia);
      formData.append('caption',caption);
      
      const result = await createPost(formData);
      console.log(result)
    } catch(e){
      console.log(e)
    }
  };

  const handleUpload = () => {
    
  };


  return (
    <div>Upload</div>
  )
}

export default Upload