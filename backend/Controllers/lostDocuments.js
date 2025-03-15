import LostId from "../models/lostId.js";
import lostPassport from "../models/lostPassport.js";



export const reportLostId = async (req, res) => {
    const {
        abstractNumber,
        idNumber,
        fname, mname, lname,
        email, phoneNumber,
        lostCounty, homeCounty
    } = req.body;

    // ✅ Improved validation
    if (!abstractNumber || !idNumber || !fname || !email || !phoneNumber || !lostCounty || !homeCounty) {
        return res.status(400).json({ success: false, message: "Missing required details" });
    }

    try {
        // ✅ Check if ID is already reported
        const lostIdReported = await LostId.findOne({ abstractNumber });
        if (lostIdReported) {
            return res.status(400).json({ success: false, message: "Lost ID already reported" });
        }

        // ✅ Create lost ID record
        const newLostId = await LostId.create({
            abstractNumber, idNumber, fname, mname, lname, email, phoneNumber, lostCounty, homeCounty
        });

        return res.status(201).json({
            success: true,
            message: "Lost ID reported successfully",
            data: newLostId,
        });

    } catch (error) {
        console.error("Error reporting lost ID:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

//lost passport
export const reportLostPassport = async (req, res) => {
    const {
        abstractNumber,
        passportNumber,
        fname,
        mname,
        lname,
        email,
        phoneNumber,
        lostCounty,
        homeCounty
    } = req.body;

    if (!abstractNumber || !passportNumber || !fname || !email || !phoneNumber || !lostCounty || !homeCounty) {
        return res.status(400).json({ success: false, message: "Missing required details" });
    }
    try {
        const lostPassportReported = await lostPassport.findOne({ abstractNumber });
        if (lostPassportReported) {
            return res.status(400).json({ success: false, message: "Lost Passport already reported" });
        }

        const newLostPassport = await lostPassport.create({
            abstractNumber, passportNumber, fname, mname, lname, email, phoneNumber, lostCounty, homeCounty
        });

        return res.status(201).json({
            success: true,
            message: "Lost Passport reported successfully",
            data: newLostPassport,
        });

    } catch (error) {
        console.error("Error reporting lost Passport:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}
