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
    const navigate = useNavigate(); // To handle navigation after login

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state when form is submitted

        try {
            const response = await axios.post('http://localhost:4000/login', formData);
            toast.success("Login successfully");

            // Store the token and user data in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data

            // Redirect to home page after successful login
            navigate('/');
        } catch (error) {
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
                className="bg-white p-8 rounded shadow-md max-w-md w-full"
            >
                <h2 className="text-2xl font-bold items-center justify-center text-center flex gap-3 mb-6">
                    <FaLock />
                    Login</h2>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full bg-red-500 text-white py-3 px-4 rounded hover:bg-green-600 ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="mt-4 text-center font-semibold text-gray-600">
                    Don't have an account?{' '}
                    <a href="/sign-up" className="text-green-500 underline underline-offset-1 hover:underline">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
