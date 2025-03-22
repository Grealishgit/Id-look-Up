import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormsUpload = () => {
    const [files, setFiles] = useState({
        formA: null,
        formB: null,
        formC: null,
    });
    const [personalDetails, setPersonalDetails] = useState({
        serialNo: "",
        fname: "",
        mname: "",
        lname: "",
        phone: "",
        email: "",
        address: "",
    });
    const [error, setError] = useState("");

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (!["application/pdf"].includes(file.type)) {
                setError("Only PDF files are allowed.");
                return;
            }
            setError("");
            setFiles((prev) => ({
                ...prev,
                [type]: file,
            }));
        }
    };

    const handlePersonalDetailsChange = (e) => {
        const { name, value } = e.target;
        setPersonalDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate mandatory fields
        if (!files.formA || !files.formB || !files.formC) {
            toast.error("Please upload all mandatory documents.");
            return;
        }

        // Validate personal details
        const { serialNo, fname, mname, lname, phone, email, address } = personalDetails;
        if (!serialNo || !fname || !lname || !phone || !email || !address) {
            toast.error("Please fill in all mandatory fields.");
            return;
        }

        setError("");

        // Prepare form data
        const formData = new FormData();
        formData.append("serialNo", serialNo);
        formData.append("fname", fname);
        formData.append("mname", mname);
        formData.append("lname", lname);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("formA", files.formA);
        formData.append("formB", files.formB);
        formData.append("formC", files.formC);



        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to submit the form.");
                return;
            }

            const response = await axios.post("http://localhost:4000/upload-forms", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                toast.success("Forms uploaded successfully!");
                setPersonalDetails({
                    serialNo: "",
                    fname: "",
                    mname: "",
                    lname: "",
                    phone: "",
                    email: "",
                    address: "",
                });
                setFiles({
                    formA: null,
                    formB: null,
                    formC: null,
                });
            }
        } catch (error) {
            console.error("Upload Error:", error);

            // If the response exists and it's a 400 error for duplicate forms
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message || "Forms already uploaded for this serial number.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    }

    return (
        <div className="min-h-screen max-w-screen-full bg-gray-200 mt-20 py-8 px-4">
            {/* Centered Heading and Description */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">
                    Apply <span className="text-green-500">For A <span className="text-red-500">Lost ID/Maisha Number</span></span>
                </h1>
                <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
                    Fill the following form and submit the necessary files used for applying an ID/Maisha Number.
                </p>
            </div>

            {/* Form Container */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[700px] mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Upload Filled Forms
                </h1>
                <p className="text-gray-600 mb-6 text-center">
                    If you have filled out the forms manually, please upload them here.
                    Ensure all mandatory fields are completed before submission.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Personal Details Section */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
                        <div>
                            <label className="block text-gray-700">Serial Number</label>
                            <input
                                type="text"
                                placeholder="Serial Number"
                                name="serialNo"
                                value={personalDetails.serialNo}
                                onChange={handlePersonalDetailsChange}
                                className="w-full p-2 border mb-5 border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="fname"
                                    placeholder="First Name"
                                    value={personalDetails.fname}
                                    onChange={handlePersonalDetailsChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Middle Name</label>
                                <input
                                    type="text"
                                    name="mname"
                                    placeholder="Middle Name"
                                    value={personalDetails.mname}
                                    onChange={handlePersonalDetailsChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lname"
                                    placeholder="Last Name"
                                    value={personalDetails.lname}
                                    onChange={handlePersonalDetailsChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    name="phone"
                                    value={personalDetails.phone}
                                    onChange={handlePersonalDetailsChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={personalDetails.email}
                                    onChange={handlePersonalDetailsChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Address Line</label>
                                <input
                                    type="text"
                                    placeholder="Address Line"
                                    name="address"
                                    value={personalDetails.address}
                                    onChange={handlePersonalDetailsChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* File Upload Sections */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Form (A1) (Mandatory)
                        </label>
                        <input
                            type="file"
                            name="formA"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, "formA")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {files.formA && (
                            <p className="text-sm text-green-600 mt-1">
                                File uploaded: {files.formA.name}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Form (B1) (Mandatory)
                        </label>
                        <input
                            type="file"
                            name="formB"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, "formB")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {files.formB && (
                            <p className="text-sm text-green-600 mt-1">
                                File uploaded: {files.formB.name}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Form (C1) (Mandatory)
                        </label>
                        <input
                            type="file"
                            name="formC"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, "formC")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {files.formC && (
                            <p className="text-sm text-green-600 mt-1">
                                File uploaded: {files.formC.name}
                            </p>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-green-600 text-white px-4 py-4 rounded-md"
                    >
                        Submit Forms
                    </button>
                    <p className="text-lg font-semibold mt-3 text-center">
                        Provided wrong details?
                        <a className="underline underline-offset-1 text-red-500" href="/contact"> Contact Us </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default FormsUpload;