import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import cloudinary from '../config/cloudinaryConfig.js';
import generateToken from '../utils/generateToken.js';

export const signUp = async (req, res) => {
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
        return res.json({ success: false, messge: "Missing Details" })
    }
    try {

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ success: false, messge: "User Already Exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fname,
            lname,
            email,
            password: hashedPassword,
        })

        res.json({
            success: true,
            user: {
                _id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email
            },
            token: generateToken(user._id),
            message: 'User Registered Successfully'
        })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid Credentials" });

        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: 'Invalid Credentials' });
        }
        res.json({
            success: true,
            user: {
                _id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email
            },
            token: generateToken(user._id),
            message: 'User Logged In Successfully'
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

};




export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        /* console.log("Updating User ID:", userId); */

        const { phone, idNumber, homeCounty, gender, address } = req.body;
        const imageFile = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.phone = phone || user.phone;
        user.idNumber = idNumber || user.idNumber;
        user.homeCounty = homeCounty || user.homeCounty;
        user.gender = gender || user.gender;
        user.address = address || user.address;

        if (imageFile) {
            /* console.log("Uploading Image to Cloudinary..."); */

            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                uploadStream.end(imageFile.buffer);
            });

            user.image = result.secure_url;
        }

        await user.save();

        const userObject = user.toObject();
        delete userObject.password;

        return res.json({ success: true, message: "Profile Updated Successfully", user: userObject });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//Get user Data
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from token
        /*  console.log("Fetching profile for User ID:", userId); */

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
