import React, { useState } from "react";

const FormsUpload = () => {
    const [files, setFiles] = useState({
        idForm: null,
        birthCertificate: null,
        additionalDocs: [],
    });
    const [personalDetails, setPersonalDetails] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        addressLine: "",
    });
    const [error, setError] = useState("");

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("File size should not exceed 5MB.");
                return;
            }
            if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
                setError("Only PDF, JPEG, or PNG files are allowed.");
                return;
            }
            setError("");
            setFiles((prev) => ({
                ...prev,
                [type]: type === "additionalDocs" ? [...prev.additionalDocs, file] : file,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!files.idForm || !files.birthCertificate) {
            setError("Please upload all mandatory documents.");
            return;
        }
        setError("");
        console.log("Submitted files:", files);
        console.log("Personal details:", personalDetails);
        alert("Forms uploaded successfully!");
    };

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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={personalDetails.firstName}
                                    onChange={handlePersonalDetailsChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Middle Name</label>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={personalDetails.middleName}
                                    onChange={handlePersonalDetailsChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={personalDetails.lastName}
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
                                    name="phoneNumber"
                                    value={personalDetails.phoneNumber}
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
                                    name="addressLine"
                                    value={personalDetails.addressLine}
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
                            Upload ID Form (Mandatory)
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, "idForm")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {files.idForm && (
                            <p className="text-sm text-green-600 mt-1">
                                File uploaded: {files.idForm.name}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Birth Certificate (Mandatory)
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, "birthCertificate")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {files.birthCertificate && (
                            <p className="text-sm text-green-600 mt-1">
                                File uploaded: {files.birthCertificate.name}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Additional Documents (Optional)
                        </label>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            multiple
                            onChange={(e) => handleFileChange(e, "additionalDocs")}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {files.additionalDocs.length > 0 && (
                            <p className="text-sm text-green-600 mt-1">
                                {files.additionalDocs.length} files uploaded
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
