import React, { useState } from 'react';

const KRAFinder = () => {
    const [formData, setFormData] = useState({
        idNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        businessRegistrationDetails: '',
        employerPinDetails: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted data:", formData);
        // Add functionality to handle the form submission, such as API requests
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-5 mt-15">
            <div className="text-center mb-10 mt-20">
                <h1 className="text-4xl font-bold text-gray-800">
                    Find <span className="text-green-500">Your <span className="text-red-500">KRA-PIN</span></span>
                </h1>
                <p className="text-lg font-semibold text-black max-w-3xl mx-auto">
                    Lost track of your <span className="text-red-500 font-semibold">KRA-PIN</span>?
                    Don’t worry, our efficient tool is here to help you quickly search,
                    locate, and retrieve your KRA PIN hassle-free,
                    saving you time and effort.
                </p>
            </div>
            <div className="max-w-3xl mx-auto bg-white p-6 px-4 rounded-md shadow-md shadow-gray-500">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    KRA  <span className='text-green-500'>Finder</span> Tool
                </h1>
                <p className="text-gray-600 mb-4 text-center">
                    Enter your details below to retrieve your  <span className='text-red-500 font-semibold'>KRA-PIN</span>  efficiently.
                </p>
                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit} className="max-w-[700px] w-full space-y-4 p-8">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="idNumber">
                                ID Number/Maisha Number/Passport No
                            </label>
                            <input
                                type="text"
                                id="idNumber"
                                name="idNumber"
                                value={formData.idNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your ID number"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-5">
                            <div className='mb-4'>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your first name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="middleName">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    id="middleName"
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your middle name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your last name"
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5'>
                            <div className='mb-4'>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="businessRegistrationDetails">
                                Business Registration Certificate Details (for Business Owners)
                            </label>
                            <input
                                id="businessRegistrationDetails"
                                name="businessRegistrationDetails"
                                value={formData.businessRegistrationDetails}
                                onChange={handleChange}
                                className="w-full mb-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your business registration details"
                            ></input>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="employerPinDetails">
                                Employer's PIN Details (for Employees)
                            </label>
                            <input
                                id="employerPinDetails"
                                name="employerPinDetails"
                                value={formData.employerPinDetails}
                                onChange={handleChange}
                                className="w-full px-4 mb-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your employer's PIN details"
                            ></input>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-4 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                        <p className='text-lg font-semibold'>Unable to locate your
                            <span className='text-red-600'> KRA-PIN</span>? Contact Us
                            <a className="text-green-500 underline text-md font-semibold underline-offset-1 hover:underline"
                                href="/contact">  here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default KRAFinder;
