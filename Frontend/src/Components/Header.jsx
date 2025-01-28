import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        // Clear token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/'); // Redirect to home page
    };

    return (
        <div
            className="pt-[20px] min-h-screen mb-2 bg-cover bg-center flex flex-col items-start justify-center w-full overflow-hidden"
            style={{ backgroundImage: "url('/des3.png')" }}
            id="Header"
        >
            <div className="text-center sm:text-left sm:ml-20 px-4 sm:px-20 mt-14">
                {/* Main Heading */}
                <h1 className="text-6xl sm:text-8xl font-bold text-black mb-4 sm:mb-4">
                    ID <span className="text-red-600">Look</span><span className='text-white'>-</span><span className="text-green-500">Up</span>
                </h1>

                <p className="text-2xl sm:text-5xl font-semibold text-gray-800 mb-4 sm:ml-0">
                    Find your lost IDs effortlessly.
                </p>
                <p className="text-sm sm:text-lg text-black sm:ml-0 mt-4 font-bold sm:max-w-4xl leading-relaxed mx-auto sm:mx-0">
                    Losing ID cards has always been a frustrating experience,
                    often resulting in time-consuming recovery processes. With ID Look-Up,
                    we make it simple and efficient to locate lost IDs, ensuring you regain
                    your vital documents with ease and peace of mind.
                </p>
                {!token && (
                    <>
                        <p className='text-lg mt-2 text-gray-600 font-semibold'>
                            Please <span className='text-red-600'>SIGN-UP </span> <br />
                            or <span className='text-red-500'>LOGIN</span>  if you already created an account to explore more features.
                        </p>
                    </>)}
                <div className="text-center sm:text-center mt-8 flex justify-center sm:justify-start gap-4 items-center">
                    {!token ? (
                        <>
                            <Link to="/sign-up" className="px-6 py-2 bg-red-500 hover:bg-green-500 text-white rounded">Sign Up</Link>
                            <Link to="/login" className="px-7 py-2 bg-black hover:bg-green-500 text-white rounded">Login</Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-red-500 hover:bg-green-500 text-white rounded"
                        >
                            Logout
                        </button>
                    )}
                </div>

                <div className="mt-4 mb-5">
                    <h1 className="text-5xl text-green-500 font-semibold cursor-pointer text-center p-3">
                        Available <span className='text-red-500'>Services</span>
                    </h1>
                    <p className="text-center text-gray-700 font-semibold text-lg">
                        Discover a variety of services we offer to simplify and secure your document management.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {/* Lost ID Finder */}

                        <div className="bg-gray-200 p-6 rounded-lg hover:bg-green-300 shadow-md shadow-black">
                            <h2 className="font-semibold text-lg text-center">Lost ID Finder</h2>
                            <p className="text-gray-800 mt-2 text-sm font-semibold text-center">
                                Easily track whether your lost ID has been recovered and added to our secure database, enabling retrieval instead of reapplication.
                            </p>
                            {token && (
                                <>
                                    <button className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-red-700 block mx-auto">
                                        <a href="/id-finder">View More</a>

                                    </button>
                                </>)}
                        </div>

                        {/* Track Lost Passport */}
                        <div className="bg-gray-200 p-6 rounded-lg hover:bg-green-300 shadow-md shadow-black">
                            <h2 className="font-semibold text-lg text-center">Track Lost Passport</h2>
                            <p className="text-gray-800 mt-2 text-sm font-semibold text-center">
                                Check if your lost passport has been processed or found, and get real-time updates on its status.
                            </p>
                            {token && (
                                <>
                                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-700 block mx-auto">
                                        <a href="/passport-finder">View More</a>

                                    </button>
                                </>)}
                        </div>

                        {/* Document Search */}
                        <div className="bg-gray-200 p-6 rounded-lg hover:bg-green-300 shadow-md shadow-black">
                            <h2 className="font-semibold text-lg text-center">Document Search</h2>
                            <p className="text-gray-800 mt-2 text-sm font-semibold text-center">
                                Search for important documents, including IDs, passports, and official records, securely in our database.
                            </p>
                            {token && (
                                <>
                                    <button className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-red-700 block mx-auto">
                                        <a href="/id-finder">View More</a>

                                    </button>
                                </>)}
                        </div>

                        {/* Report Lost Documents */}
                        <div className="bg-gray-200 p-6 rounded-lg hover:bg-green-300 shadow-md shadow-black">
                            <h2 className="font-semibold text-lg text-center">Report Lost Documents</h2>
                            <p className="text-gray-800 mt-2 text-sm font-semibold text-center">
                                Report lost passports, IDs, or other documents with ease, ensuring they are flagged and recovered quickly.
                            </p>
                            {token && (
                                <>
                                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-700 block mx-auto">
                                        <a href="/report">View More</a>

                                    </button>
                                </>)}
                        </div>
                        {/* Apply for New Documents */}
                        <div className="bg-gray-200 p-6 rounded-lg hover:bg-green-300 shadow-md shadow-black">
                            <h2 className="font-semibold text-lg text-center">Apply for New Documents</h2>
                            <p className="text-gray-800 mt-2 text-sm font-semibold text-center">
                                Start the application process for new IDs, passports, or other important documents directly from our platform.
                            </p>
                            {token && (
                                <>
                                    <button className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-red-700 block mx-auto">
                                        <a href="/apply-id">View More</a>

                                    </button>
                                </>)}
                        </div>


                        <div className="bg-gray-200 p-6 rounded-lg hover:bg-green-300 shadow-md shadow-black">
                            <h2 className="font-semibold text-lg text-center">Replace Lost ID/Maisha Number</h2>
                            <p className="text-gray-800 mt-2 text-sm font-semibold text-center">
                                Re-apply your lost ID/Maisha Number quickly and efficiently, whether got lost long time ago or recently.
                            </p>
                            {token && (
                                <>
                                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-700 block mx-auto">
                                        <a href="/lost-id">View More</a>
                                    </button>
                                </>)}
                        </div>
                    </div>
                </div>

                {!token && (
                    <>
                        <div className="mt-4 mb-5">
                            <div className='bg-gray-200 rounded-lg mt-6 p-4 shadow-black shadow-lg transition-transform transform hover:scale-105'>
                                <h3 className="text-2xl font-semibold mb-2 mt-3 text-center text-red-500">About Us</h3>
                                <p className="text-lg text-black font-semibold text-center">
                                    ID Look-Up is a dedicated platform designed to help you recover lost documents effortlessly.
                                    <br /> We specialize in providing a secure and user-friendly service for tracking lost IDs,
                                    <br /> passports, driving licenses, and other essential documents.
                                </p>

                                <h3 className='text-red-500 font-semibold text-3xl text-center mt-3'>Our Mission</h3>
                                <p className="text-lg text-black font-semibold mt-2 text-center">
                                    Our mission is to bridge the gap between individuals and their lost documents, saving time, stress, and resources. <br />
                                    We work in collaboration with institutions and local authorities to ensure your documents are easily accessible and safely returned to you.
                                </p>
                                <p className="text-lg text-black font-semibold mt-2 mb-4 text-center">
                                    With advanced tracking systems, real-time updates, and a commitment to data security, ID Look-Up is here to make the process seamless and reliable. Whether you need to report a lost document or check its recovery status, we've got you covered.
                                </p>
                            </div>
                        </div>
                    </>)}



            </div>
        </div>
    );
};

export default Header;
