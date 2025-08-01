const cloudinary = require("cloudinary").v2;
const path = require("node:path");
const fs = require("fs/promises");



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


async function uploadImg(fileName) {
    const filePath = path.resolve(fileName);

    const res = await cloudinary.uploader.upload(
        filePath, 
        {
            asset_folder: "post-images"
        }
    );
    
    await fs.unlink(filePath);

    if (res.error || !res.secure_url) {
        return null;
    }

    return {url: res.secure_url, id: res.public_id};
};


async function deleteImg(assetId) {
    await cloudinary.uploader.destroy(assetId);
};



module.exports = {
    uploadImg,
    deleteImg
};