import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ReportPassport = () => {
    const [formData, setFormData] = useState({
        abstractNumber: '',
        passportNumber: '',
        fname: '',
        mname: '',
        lname: '',
        email: '',
        phoneNumber: '',
        lostCounty: '',
        homeCounty: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/lost-passport', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            toast.success(response.data.message);
            setFormData({
                abstractNumber: '',
                passportNumber: '',
                fname: '',
                mname: '',
                lname: '',
                email: '',
                phoneNumber: '',
                lostCounty: '',
                homeCounty: '',
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 bg-gray-300">
            <div className="text-center mb-10 mt-20">
                <h1 className="text-4xl font-bold text-gray-800">
                    Report <span className="text-green-500">Lost <span className="text-red-500">Documents</span></span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Please enter the following details to report your lost <span className='text-red-500 font-semibold'>Passport</span>.
                </p>
            </div>

            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded shadow-md max-w-[700px] w-full"
                >
                    <h2 className="text-3xl font-bold text-center mb-6">Report Lost Passport</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Abstract Number</label>
                            <input
                                type="text"
                                name="abstractNumber"
                                value={formData.abstractNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder='AP-3031-2024'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Passport Number</label>
                            <input
                                type="text"
                                name="passportNumber"
                                value={formData.passportNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder='A123456'
                                required
                            />
                        </div>
                    </div>

                    <p className='text-red-600 text-center mt-2 mb-3 text-sm md:text-lg font-semibold'>
                        Please fill with "N/A" if not applicable or available
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block font-semibold text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder='John'
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Middle Name</label>
                            <input
                                type="text"
                                name="mname"
                                value={formData.mname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder='James'
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lname"
                                value={formData.lname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder='Mike'
                                required
                            />
                        </div>
                    </div>

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
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Lost County</label>
                            <input
                                type="text"
                                name="lostCounty"
                                value={formData.lostCounty}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Nairobi"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">Home County</label>
                            <input
                                type="text"
                                name="homeCounty"
                                value={formData.homeCounty}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Mombasa"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-4 px-4 rounded hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Report'}
                    </button>
                    <p className='mt-3 text-lg font-semibold text-center'>
                        Report Lost ID? <a className="text-green-500 underline text-md font-semibold underline-offset-1 hover:underline" href="/report">Click here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ReportPassport;
