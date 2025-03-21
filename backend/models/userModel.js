import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    phone: { type: String },
    idNumber: { type: String },
    homeCounty: { type: String },
    address: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: false },
},
{
    timestamps:true,
}
);

const User = mongoose.model('User', userSchema);
export default User;
