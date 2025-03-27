import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUserEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Registration successful! ");

            /* const { fname, lname, email } = formData;
            localStorage.setItem('user', JSON.stringify({ fname, lname, email })); */

            // Store the token and user data in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data

            // Redirect to home page after successful login
            navigate('/');

        } catch (err) {
            toast.error(err.message || 'An error occurred');
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover
            bg-gray-100 bg-center w-full overflow-hidden flex-col mb-2"
            style={{ backgroundImage: "url('/des3.png')" }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-slate-400 p-10 rounded-lg shadow-md max-w-md w-full"
            >
                <h2 className="text-4xl font-bold items-center gap-3 flex justify-center text-center mb-6">
                    <FaUserEdit />
                    Sign Up</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error message */}

                <div className="mb-5">
                    <label className="block font-semibold text-black">First Name</label>
                    <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label className="block font-semibold text-black">Last Name</label>
                    <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold text-black">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl "
                        required
                    />
                </div>

                {/* Password field with show/hide functionality */}
                <div className="mb-4 relative">
                    <label className="block font-semibold text-black">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl pr-10"
                        required
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-10 cursor-pointer text-gray-700"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-xl text-white ${loading ? 'bg-gray-400' : 'bg-black'} hover:bg-orange-500`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>

                <p className="mt-4 text-center font-semibold text-black">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="text-orange-600 underline text-xl font-semibold underline-offset-1 hover:underline"
                    >
                        Login
                    </a>
                </p>
            </form>

        </div>
    );
};

export default SignUp;
