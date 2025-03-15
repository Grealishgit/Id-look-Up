import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUserEdit } from "react-icons/fa";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Something went wrong. Please try again.');
            }

            const data = await response.json();
            toast.success("Registration successful! Please login.");

            // Save user data to localStorage for profile display
            const { fname, lname, email } = formData;
            localStorage.setItem('user', JSON.stringify({ fname, lname, email }));

            // Redirect to login or profile
            window.location.href = '/login';
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
                className="bg-white p-8 rounded shadow-md max-w-md w-full"
            >
                <h2 className="text-2xl font-bold items-center gap-3 flex justify-center text-center mb-6">
                    <FaUserEdit />
                    Sign Up</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error message */}

                <div className="mb-5">
                    <label className="block font-semibold text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label className="block font-semibold text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold text-gray-700">Email</label>
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
                    <label className="block font-semibold text-gray-700">Password</label>
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
                    className={`w-full py-3 px-4 rounded text-white ${loading ? 'bg-gray-400' : 'bg-red-500'} hover:bg-green-600`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>

                <p className="mt-4 text-center font-semibold text-black">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="text-green-500 underline text-md font-semibold underline-offset-1 hover:underline"
                    >
                        Login
                    </a>
                </p>
            </form>
            {/* Add ToastContainer here so that the toast notifications are displayed */}
        </div>
    );
};

export default SignUp;
