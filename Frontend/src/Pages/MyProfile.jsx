import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCircleUser } from "react-icons/fa6";
import { formatDate } from '../Components/utils';
import LoadingSpinner from '../Components/LoadingSpinner';
import axios from 'axios';

const MyProfile = () => {
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        idNumber: "",
        homeCounty: "",
        address: "",
        phone: "",
        image: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Update `editedUser` when entering edit mode
    const handleEditProfile = () => {
        setEditedUser({ ...user });
        setIsEditing(true);
    };



    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("No token found, redirecting to login...");
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userdata`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                setUser(response.data.user);
                setEditedUser(response.data.user); 
            } catch (error) {
                toast.error("Error fetching profile data");
            }
        };

        fetchUserProfile();
    }, []);



    // Handle input changes
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUser((prevUser) => ({
                ...prevUser,
                image: imageUrl,
            }));
            setProfileImage(file);
        }
    };

    // Update user profile
    const handleSaveChanges = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You are not authenticated");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("phone", editedUser.phone);
        formData.append("idNumber", editedUser.idNumber);
        formData.append("homeCounty", editedUser.homeCounty);
        formData.append("gender", editedUser.gender || "");
        formData.append("address", editedUser.address || "");
        if (profileImage) {
            formData.append("image", profileImage);
        }

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/update-profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // DO NOT set 'Content-Type', let Axios handle it
                    }
                }
            );

            if (response.data.success) {
                setUser((prevUser) => ({
                    ...prevUser,
                    ...response.data.user
                }));
                setIsEditing(false);
                toast.success("Profile updated successfully!");
            } else {
                toast.error(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating profile");
        }
        setLoading(false);
    };





    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="relative mt-20 p-8 bg-white z-20">
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-4 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <LoadingSpinner />
                </div>
            )}

            <h1 className="text-4xl font-bold text-center text-gray-800">
                Your <span className="text-green-500">Profile <span className='text-red-500'>Info</span> </span>
            </h1>
            <p className='text-center text-md font-semibold'>
                If you want to edit your profile, click the <span className='text-blue-600'>Edit Profile button</span> below.
            </p>
            <div className={`transition ${loading ? "blur-sm pointer-events-none" : ""} flex flex-col items-center max-w-md mx-auto mt-10 mb-2 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md`}>
                <p className='text-center text-2xl font-semibold mt-2'>Personal <span className='text-blue-600'>Information</span> </p>
                <div className="mb-4 mt-2">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
                        />
                    ) : (
                        <FaCircleUser className="w-24 h-24 text-gray-400 border-2 border-gray-300 rounded-full p-2" />
                    )}
                    {isEditing && (
                        <input type="file" onChange={handleImageChange} className="mt-2 text-sm" />
                    )}
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEditing ? (
                            <input
                                type="text"
                                name="fname"
                                value={editedUser.fname}
                                onChange={handleEditChange}
                                className="border-b-2 border-gray-300 focus:outline-none"
                            />
                        ) : (
                            `${user.fname} ${user.lname}`
                        )}
                    </h2>

                    <div className="mt-4">
                        <p className="text-lg text-gray-700">
                            <span className="font-bold">Email:</span>{' '}
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleEditChange}
                                    className="border-b-2 border-gray-300 focus:outline-none"
                                    disabled
                                />
                            ) : (
                                user.email
                            )}
                        </p>

                        <p className="text-lg text-gray-700">
                            <span className="font-bold">Phone Number:</span>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedUser.phone}
                                    onChange={handleEditChange}
                                    className="border-b-2 border-gray-300 focus:outline-none"
                                />
                            ) : (
                                user.phone
                            )}
                        </p>

                        <p className="text-lg text-gray-700">
                            <span className="font-bold">Gender:</span>{' '}
                            {isEditing ? (
                                <select
                                    name="gender"
                                    value={editedUser.gender}
                                    onChange={handleEditChange}
                                    className="border-b-2 border-gray-300 focus:outline-none bg-transparent"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                user.gender
                            )}
                        </p>

                        <p className="text-lg text-gray-700">
                            <span className="font-bold">ID Number:</span>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="idNumber"
                                    value={editedUser.idNumber}
                                    onChange={handleEditChange}
                                    className="border-b-2 border-gray-300 focus:outline-none"
                                />
                            ) : (
                                user.idNumber
                            )}
                        </p>

                        <p className="text-lg text-gray-700">
                            <span className="font-bold">Address:</span>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={editedUser.address}
                                    onChange={handleEditChange}
                                    className="border-b-2 border-gray-300 focus:outline-none"
                                />
                            ) : (
                                user.address
                            )}
                        </p>

                        <p className="text-lg text-gray-700">
                            <span className="font-bold">Home County:</span>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="homeCounty"
                                    value={editedUser.homeCounty}
                                    onChange={handleEditChange}
                                    className="border-b-2 border-gray-300 focus:outline-none"
                                />
                            ) : (
                                user.homeCounty
                            )}
                        </p>
                        <p className="font-bold text-gray-700 text-lg"> Account Created On:
                            <span className='text-green-500'> {formatDate(user?.updatedAt)}</span>
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    {isEditing ? (
                        <button
                            onClick={handleSaveChanges}
                            className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none"
                            disabled={loading}
                        >
                            Save Changes
                        </button>

                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                                Update Profile
                        </button>
                    )}

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;