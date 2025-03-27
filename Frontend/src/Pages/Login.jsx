import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData);

            // Check if the response is actually successful
            if (response.status !== 200 || !response.data.token) {
                throw new Error("Invalid credentials");
            }

            toast.success("Login successful");

            // Store the token and user data in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');

        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message); 
            toast.error("Invalid Email or Password");
            setError('Invalid credentials, please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-gray-100 bg-center w-full overflow-hidden flex-col mb-2"
            style={{ backgroundImage: "url('/des3.png')" }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-slate-400 p-10 rounded-2xl shadow-md max-w-md w-full min-h-[600px]"
            >
                <h2 className="text-2xl mt-10 font-bold items-center justify-center text-center flex gap-3 mb-6">
                    <FaLock />
                    Login</h2>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                <div className="mb-4">
                    <label className="block text-black">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 bg-stone-50 border-4 border-slate-600 py-2 rounded-xl"
                        required
                    />
                </div>
                <div className="mb-4 ">
                    <label className="block text-black">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-stone-50 border-4 border-slate-600 rounded-xl"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full bg-black text-white mt-20 py-3 px-4 rounded-2xl hover:bg-orange-600 ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="mt-4 text-center font-semibold text-black">
                    Don't have an account?{' '}
                    <a href="/sign-up" className="text-orange-500 text-lg underline underline-offset-1 hover:underline">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
