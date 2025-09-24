import { v2 as cloudinary } from "cloudinary";


async function uploadToCloud(file) {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    });
    try {
        const result = await cloudinary.uploader.upload(file, { resource_type: "auto" });
        return result.secure_url;
    } catch (e) {
        console.error(e)
    }

}

export default uploadToCloud;