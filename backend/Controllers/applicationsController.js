import cloudinary from "../config/cloudinaryConfig.js";
import ApplyLostId from "../models/applyLostId.js";
import FormUploads from "../models/formUploads.js";


export const applyLostId = async (req, res) => {
    try {
        const { idNo, fname, mname, lname, dob, County, SubCounty, Constituency, Ward } = req.body;

        if (!idNo || !fname || !mname || !lname || !dob || !County || !SubCounty || !Constituency || !Ward) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }
        /*        console.log("Request Body:", req.body);
               console.log("Uploaded File:", req.file); // Ensure this logs correctly */

        const lostIdAlreadyApplied = await ApplyLostId.findOne({ idNo: String(idNo) });
        if (lostIdAlreadyApplied) {
            return res.status(400).json({ success: false, message: "Lost ID already Applied" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        // Get the uploaded file from Multer
        const imageFile = req.file; 

        let imageUrl = null;

        if (imageFile) {
            console.log("Uploading Image to Cloudinary...");

            // Upload to Cloudinary using upload_stream
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                uploadStream.end(imageFile.buffer); // Send the file buffer to Cloudinary
            });
            // Get the uploaded image URL
            imageUrl = result.secure_url; 
        }

        // Save to database
        const newApplication = new ApplyLostId({
            idNo: req.body.idNo,
            image: imageUrl, 
            fname: req.body.fname,
            mname: req.body.mname,
            lname: req.body.lname,
            dob: req.body.dob,
            County: req.body.County,
            SubCounty: req.body.SubCounty,
            Constituency: req.body.Constituency,
            Ward: req.body.Ward,
            user: req.user.id, 
        });

        await newApplication.save();

        res.status(201).json({ message: "Application submitted successfully", application: newApplication });
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({ message: "Cloudinary upload failed" });
    }
}

export const getUserLostIdApplications = async (req, res) => {
    try {
        const applications = await ApplyLostId.find({ user: req.user.id });
        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error getting applications:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getAllLostIdApplications = async (req, res) => {
    try {
        const applications = await ApplyLostId.find(); 
        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error getting all applications:", error);
        res.status(500).json({ message: "Server error" });
    }
};


//After implementing the Admin section, the code will look like this:
/* export const getLostIdApplications = async (req, res) => {
    try {
        let applications;

        if (req.user.role === "admin") {
            applications = await ApplyLostId.find(); // Admin gets all applications
        } else {
            applications = await ApplyLostId.find({ user: req.user.id }); // Regular user gets only their applications
        }

        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error getting applications:", error);
        res.status(500).json({ message: "Server error" });
    }
}; */

//Uploading forms if the user has applied for an ID manually
export const userUploadsForms = async (req, res) => {
    try {
        const { serialNo, fname, mname, lname, email, phone, address } = req.body;
        const userId = req.user?.id; // Get the authenticated user's ID

        if (!serialNo || !fname || !mname || !lname || !email || !phone || !address) {
            return res.status(400).json({ message: "Missing details" });
        }

        const formAlreadySubmitted = await FormUploads.findOne({ serialNo });
        if (formAlreadySubmitted) {
            return res.status(400).json({ message: "Forms already uploaded for this serial number" });
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "No files uploaded." });
        }

        let formAUrl = null, formBUrl = null, formCUrl = null;

        // Helper function to upload PDFs & images to Cloudinary
        const uploadToCloudinary = async (file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "raw", folder: "userForms" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                uploadStream.end(file.buffer);
            });
        };

        // Upload forms if available
        if (req.files["formA"]) formAUrl = await uploadToCloudinary(req.files["formA"][0]);
        if (req.files["formB"]) formBUrl = await uploadToCloudinary(req.files["formB"][0]);
        if (req.files["formC"]) formCUrl = await uploadToCloudinary(req.files["formC"][0]);

        const newUpload = new FormUploads({
            serialNo,
            fname,
            mname,
            lname,
            email,
            phone,
            address,
            formA: formAUrl,
            formB: formBUrl,
            formC: formCUrl,
            uploadedBy: userId, // Save the user ID
        });

        await newUpload.save();

        res.status(201).json({ message: "Forms uploaded successfully!", data: newUpload });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Get forms uploaded by a specific user
export const getUserUploadedForms = async (req, res) => {
    try {
        const userId = req.user?.id; // Get authenticated user's ID

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userForms = await FormUploads.find({ uploadedBy: userId });

        if (!userForms.length) {
            return res.status(404).json({ message: "No forms found for this user" });
        }

        res.status(200).json({ data: userForms });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Get all form uploads
export const getAllFormUploads = async (req, res) => {
    try {
        const formUploads = await FormUploads.find().populate("uploadedBy", "fname lname email"); // Populate user details

        if (!formUploads.length) {
            return res.status(404).json({ message: "No form uploads found" });
        }

        res.status(200).json({ data: formUploads });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

export const getAllApplications = async (req, res) => {
    try {
        const lostIdApplications = await ApplyLostId.find();
        const formUploads = await FormUploads.find();

        res.status(200).json({
            success: true,
            data: {
                lostIdApplications,
                formUploads
            }
        });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

