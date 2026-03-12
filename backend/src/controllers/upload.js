import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const { resource_type } = req.body; // allow frontend to specify or detect

        // Auto detect if not provided
        const options = {
            resource_type: resource_type || "auto"
        };

        const result = await cloudinary.uploader.upload(req.file.path, options);

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        res.json({
            url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type
        });

    } catch (error) {
        console.error("Upload Error:", error);
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: error.message });
    }
};
