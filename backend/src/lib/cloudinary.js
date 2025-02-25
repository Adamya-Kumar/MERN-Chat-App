import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINR_CLOUD_NAME,
    api_key:process.env.CLOUDINR_API_KEY,
    api_secret:process.env.CLOUDINR_SECRET_KEY,
});


export default cloudinary;