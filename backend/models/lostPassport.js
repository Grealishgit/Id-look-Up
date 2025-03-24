import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    abstractNumber: { type: String, required: true },
    passportNumber: { type: String, required: true },
    fname: { type: String, required: true },
    mname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    lostCounty: { type: String, required: true },
    homeCounty: { type: String, required: true },
});
const lostPassport = mongoose.model('lostPassport', userSchema)
export default lostPassport;
