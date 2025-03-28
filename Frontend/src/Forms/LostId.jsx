import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { countiesData } from '../Components/utils.js';


const LostId = () => {
    const [image, setImage] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [filteredSubCounties, setFilteredSubCounties] = useState([]); 
    const [formData, setFormData] = useState({
        idNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        county: '',
        subCounty: '',
        constituency: '',
        ward: '',
        passportPhoto: null,
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setFormData({ ...formData, passportPhoto: file });
        }
    };

    const handleCountyChange = (e) => {
        const county = e.target.value;
        setSelectedCounty(county);

        // Retrieve sub-counties from the imported data
        const selectedCountyData = countiesData.find(c => c.name === county);
        const newSubCounties = selectedCountyData ? selectedCountyData.subCounties : [];


        setFilteredSubCounties(newSubCounties);
        setFormData({ ...formData, county, subCounty: '' });
        /* console.log("Selected County:", county);
        console.log("Available Sub-Counties:", newSubCounties); */

    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to apply for a lost ID.');
            return;
        }

        const data = new FormData();
        data.append("idNo", formData.idNumber);
        data.append("fname", formData.firstName);
        data.append("mname", formData.middleName);
        data.append("lname", formData.lastName);
        data.append("dob", formData.dob);
        data.append("County", formData.county);
        data.append("SubCounty", formData.subCounty);
        data.append("Constituency", formData.constituency);
        data.append("Ward", formData.ward);
        data.append("passportPhoto", formData.passportPhoto); 

        try {

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/apply-lostId`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success(response.data.message || 'Application submitted successfully!');
                setFormData({
                    idNumber: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    dob: '',
                    county: '',
                    subCounty: '',
                    constituency: '',
                    ward: '',
                    passportPhoto: null,
                });
                setImage(null);
                setSelectedCounty('');
                setFilteredSubCounties([]);
            } else {
                toast.error(response.data.message || 'Failed to submit application. Please try again.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
            console.error(error);
        }
    };


    return (
        <div className="max-w-screen-full mt-10 mx-auto py-12 px-4 bg-teal-100 min-h-screen">
            <ToastContainer />
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                Apply <span className="text-green-500">For <span className='text-red-500'>A Lost ID</span> </span>
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
                Please enter your details below to apply for your lost ID/Maisha Number.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-[700px] mx-auto">
                {/* Image Upload */}
                <div className="flex justify-center mb-6">
                    {image ? (
                        <img src={image} alt="Uploaded" className="w-32 h-32 object-cover rounded-full" />
                    ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>

                <label htmlFor='passportPhoto' className='block text-gray-700 mb-2'>Passport-sized Photo</label>
                <input
                    type="file"
                    id="passportPhoto"
                    onChange={handleImageUpload}
                    className="mb-6 w-full py-2 px-4 border border-gray-300 rounded-md"
                    required
                />

                {/* Form Fields */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="idNumber" className="block text-gray-700">ID/Maisha Number</label>
                        <input
                            type="text"
                            id="idNumber"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                            placeholder="12345678"
                            value={formData.idNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 mt-4 sm:grid-cols-3 gap-6 mb-6">

                        <div>
                            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                placeholder="Abdul"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="middleName" className="block text-gray-700">Middle Name</label>
                            <input
                                type="text"
                                id="middleName"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                placeholder="Kiprotich"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                placeholder="Omondi"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className='text-center mb-2 text-lg font-semibold'>Place Of Birth Details</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                value={formData.dob}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="county" className="block text-gray-700">County</label>
                            <select
                                id="county"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                onChange={handleCountyChange}
                                value={selectedCounty}
                                required
                            >
                                <option value="">Select County</option>
                                {countiesData.map((county, index) => (
                                    <option key={index} value={county.name}>{county.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="subCounty" className="block text-gray-700">Sub-County</label>
                            <select
                                id="subCounty"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                value={formData.subCounty}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Sub-County</option>
                                {filteredSubCounties.map((subCounty, index) => (
                                    <option key={index} value={subCounty}>{subCounty}</option>
                                ))}
                            </select>

                        </div>
                        <div>
                            <label htmlFor="constituency" className="block text-gray-700">Constituency</label>
                            <input
                                type="text"
                                id="constituency"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                placeholder="Westlands"
                                value={formData.constituency}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="ward" className="block text-gray-700">Ward</label>
                        <input
                            type="text"
                            id="ward"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                            placeholder="Parklands"
                            value={formData.ward}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-red-500 text-white font-bold rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Apply
                    </button>
                    <div>
                        <p className="mt-4 text-center font-semibold text-black">
                            Already Applied?{' '}
                            <a href="/contact" className="text-green-500 underline text-md font-semibold underline-offset-1  hover:underline">
                                Contact Us
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LostId;