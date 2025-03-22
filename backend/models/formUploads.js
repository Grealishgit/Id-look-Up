import mongoose from "mongoose";

const formUploadSchema = new mongoose.Schema({
    serialNo: { type: String, required: true, unique: true },
    fname: String,
    mname: String,
    lname: String,
    email: String,
    phone: String,
    address: String,
    formA: String,
    formB: String,
    formC: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("FormUploads", formUploadSchema);
