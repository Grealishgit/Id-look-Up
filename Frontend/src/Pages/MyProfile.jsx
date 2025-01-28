import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting after logout
import { toast } from 'react-toastify';

const MyProfile = () => {
    const [user, setUser] = useState({
        fname: '',
        lname: '',
        email: '',
        idNumber: '', // Dynamic value, update after fetching from the API
        homeCounty: '', // Dynamic value, update after fetching from the API
        phone: '', // Dynamic value, update after fetching from the API
    });

    const [isEditing, setIsEditing] = useState(false); // State to control edit mode
    const [editedUser, setEditedUser] = useState({ ...user }); // State to hold the edited user data

    const navigate = useNavigate(); // Initialize navigate for redirecting after logout

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

            if (!token) {
                // If no token, redirect to login page
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:4000/api/user/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData); // Set the fetched user data
                    setEditedUser(userData); // Set the edited user data to match
                } else {
                    toast.error('Failed to fetch user profile');
                }
            } catch (error) {
                toast.error('Error fetching profile data:', error);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        setUser(editedUser); // Save the edited user data
        localStorage.setItem('user', JSON.stringify(editedUser)); // Update localStorage with the new data
        setIsEditing(false); // Exit edit mode
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Optional: Clear token if using JWT for authentication
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className='mt-14 p-8'>
            <h1 className="text-4xl font-bold text-center text-gray-800">
                Your <span className="text-green-500">Profile <span className='text-red-500'>Info</span> </span>
            </h1>
            <p className='text-center text-md font-semibold'>
                If you want to edit your profile, click the <span className='text-blue-600'>Edit Profile button</span> below,<br /> or if you want to change information on your profile
            </p>
            <div className="flex flex-col items-center max-w-md mx-auto mt-10 mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <p className='text-center text-2xl font-semibold mt-2'>Personal <span className='text-blue-600'>Information</span> </p>
                <div className="mb-4 mt-2">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full border-2 items-center border-gray-300"
                    />
                </div>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
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
                            <span className="font-medium">Email:</span>{' '}
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleEditChange}
                                    className="border-b-2 border-gray-300 focus:outline-none"
                                />
                            ) : (
                                user.email
                            )}
                        </p>

                        <p className="text-lg text-gray-700">
                            <span className="font-medium">Phone:</span>{' '}
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
                            <span className="font-medium">ID Number:</span>{' '}
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
                            <span className="font-medium">Home County:</span>{' '}
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
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    {isEditing ? (
                        <button
                            onClick={handleSaveChanges}
                            className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Edit Profile
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
