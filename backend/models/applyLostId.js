import mongoose from 'mongoose';

const applyLostIdSchema = new mongoose.Schema({
    idNo: { type: Number, required: true },
    image: { type: String, required: true },
    fname: { type: String, required: true },
    mname: { type: String, required: true },
    lname: { type: String, required: true },
    dob: { type: Date, required: true },
    County: { type: String, required: true },
    SubCounty: { type: String, required: true },
    Constituency: { type: String, required: true },
    Ward: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
    { timestamps: true });

const ApplyLostId = mongoose.model("ApplyLostId", applyLostIdSchema);
export default ApplyLostId;
