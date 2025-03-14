import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
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
            res.json({ success: false, message: "Invalid Credentials" });

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
