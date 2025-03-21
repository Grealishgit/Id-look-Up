import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Report = () => {
    const [formData, setFormData] = useState({
        abstractNumber: '',
        idNumber: '',
        fname: '',
        mname: '',
        lname: '',
        email: '',
        phoneNumber: '',
        lostCounty: '',
        homeCounty: '',
    });

    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("You are not authenticated");
        setLoading(false);
        return;
    }

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
            const response = await axios.post('http://localhost:4000/lost-id', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            toast.success(response.data.message);
            setFormData({
                abstractNumber: '',
                idNumber: '',
                fname: '',
                mname: '',
                lname: '',
                email: '',
                phoneNumber: '',
                lostCounty: '',
                homeCounty: '',
            });
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to submit report. Please try again.');
            }
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
                    Enter the details below to report your lost <span className="text-red-500 font-semibold">ID/Maisha Number</span>
                </p>
            </div>

            <div className="flex justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded shadow-md max-w-[700px] w-full"
                >
                    <h2 className="text-3xl font-bold text-center mb-6">Report Lost ID</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
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
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700">ID Number/Maisha Number</label>
                            <input
                                type="text"
                                name="idNumber"
                                value={formData.idNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="12345678"
                                required
                            />
                        </div>
                    </div>
                    <h3 className='text-red-600 font-bold md:text-lg text-sm text-center mb-2'>If one of the name field is not available, fill with "N/A"</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                        <div>
                            <label className="block font-semibold text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="fname"
                                value={formData.fname}
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
                                name="mname"
                                value={formData.mname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded"
                                placeholder="Charles"
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
                                placeholder="Mike"
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
                        className="w-full bg-blue-500 text-white py-4 px-4 rounded hover:bg-green-500"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Report"}
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
