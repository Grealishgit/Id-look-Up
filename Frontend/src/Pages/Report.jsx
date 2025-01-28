import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Report = () => {
    const [formData, setFormData] = useState({
        abstractNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        idNumber: '',
        lostCounty: '',
        homeCounty: '',
        email: '',
        phoneNumber: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle changes in input fields  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to check if abstract number already exists in the database
    const checkAbstractNumber = async (abstractNumber) => {
        try {
            const response = await fetch(`http://localhost:4000/api/check-abstract/${abstractNumber}`);
            const data = await response.json();

            if (response.ok) {
                return true; // abstract number is available
            } else {
                toast.error(data.message); // set error message if abstract number exists
                return false; // abstract number already exists
            }
        } catch (error) {
            toast.error('Error checking abstract number:', error);
            toast.error('Error checking abstract number. Please try again.');
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        // Check if abstractNumber has a value  
        if (!formData.abstractNumber) {
            toast.error('Abstract Number is required');
            setErrorMessage('Abstract Number is required');
            return; // Prevent submission  
        }

        // Check if the abstract number is available
        const isAbstractNumberAvailable = await checkAbstractNumber(formData.abstractNumber);
        if (!isAbstractNumberAvailable) {
            return; // Stop form submission if abstract number is already taken
        }

        const formDataToSend = {
            abstractNumber: formData.abstractNumber,
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            idNumber: formData.idNumber,
            lostCounty: formData.lostCounty,
            homeCounty: formData.homeCounty,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
        };

        try {
            const response = await fetch('http://localhost:4000/api/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSend),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            toast.success(responseData.message);  // Success message after submission


            // Clear the form after successful submission
            setFormData({
                abstractNumber: '',
                firstName: '',
                middleName: '',
                lastName: '',
                idNumber: '',
                lostCounty: '',
                homeCounty: '',
                email: '',
                phoneNumber: '',
            });

        } catch (error) {
            toast.error('Failed to submit report. Please try again.'); // Update error message  
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 bg-gray-300">
            {/* Centered Header Section */}
            <div className="text-center mb-10 mt-20">
                <h1 className="text-4xl font-bold text-gray-800">
                    Report <span className="text-green-500">Lost <span className="text-red-500">Documents</span></span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Please enter the following details to report your lost <span className="text-red-500 font-semibold">ID/Maisha Number</span>
                </p>
            </div>

            {/* Form Section */}
            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded shadow-md max-w-[700px] w-full"
                >
                    <h2 className="text-3xl font-bold text-center mb-6">Report Lost ID</h2>

                    {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                        {/* Abstract Number */}
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Abstract Number</label>
                            <input
                                type="text"
                                name="abstractNumber"
                                value={formData.abstractNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="AP-1232-2024"
                                required
                            />
                        </div>
                        {/* ID Number */}
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">ID Number</label>
                            <input
                                type="text"
                                name="idNumber"
                                value={formData.idNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder='12345678'
                                required
                            />
                        </div>
                    </div>
                    {/* Name Fields */}
                    <p className='text-red-400 text-center mt-2 mb-3 text-sm font-semibold'>
                        Please fill with "N/A" if not applicable or available
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block font-semibold text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="John"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Middle Name</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Charles"
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Mike"
                                required
                            />
                        </div>
                    </div>

                    {/* Email and Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 mt-5">
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="example@example.com"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="+254712345678"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 mt-5">
                        {/* Current County */}
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Current County</label>
                            <input
                                type="text"
                                name="lostCounty"
                                value={formData.lostCounty}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder='Nairobi'
                                required
                            />
                        </div>

                        {/* Home County */}
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Home County</label>
                            <input
                                type="text"
                                name="homeCounty"
                                value={formData.homeCounty}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder='Mombasa'
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-4 px-4 rounded hover:bg-green-500"
                    >
                        Submit Report
                    </button>
                    <p className='mt-3 text-lg font-semibold text-center'>Report Lost Passport?
                        <a className="text-green-500 underline text-md font-semibold underline-offset-1 hover:underline"
                            href="/passport-report"> Click here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Report;
