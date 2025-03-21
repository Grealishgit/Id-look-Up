import mongoose from "mongoose";

const lostSchema = new mongoose.Schema({
    abstractNumber: { type: String, required: true },
    idNumber: { type: Number, required: true },
    fname: { type: String, required: true },
    mname: { type: String, required: true },
    lname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^(?:\+254|0)7\d{8}$/, "Invalid phone number format"]
    },
    lostCounty: { type: String, required: true },
    homeCounty: { type: String, required: true }
}, { timestamps: true });

const lostId = mongoose.model("lostId", lostSchema);
export default lostId;
