import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isIdDropdownOpen, setIsIdDropdownOpen] = useState(false);

    const token = localStorage.getItem('token'); // Check if the user is logged in

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleIdDropdown = () => {
        setIsIdDropdownOpen(!isIdDropdownOpen);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
        setIsIdDropdownOpen(false);
    };

    return (
        <div>
            <nav className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
                {/* Logo */}
                <div className="logo font-bold text-4xl cursor-pointer">
                    <a href="/">ID <span className="text-green-600">Look</span>-
                        <span className="text-red-600">Up</span>.</a>

                </div>

                {/* Desktop Navbar */}
                <ul className="hidden lg:flex gap-4 items-center">
                    <li>
                        <Link to="/" className="text-2xl hover:text-blue-400" onClick={handleLinkClick}>
                            Home
                        </Link>
                    </li>
                    {token && (
                        <>
                            <li className="relative">
                                {/* ID Finder with Dropdown */}
                                <button
                                    className="text-2xl text-green-500 font-semibold hover:text-blue-400 flex items-center"
                                    onClick={toggleIdDropdown}
                                >
                                    ID Finder
                                    <span
                                        className={`ml-2 w-6 h-5 transform transition-transform ${isIdDropdownOpen ? 'rotate-180' : ''}`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                {isIdDropdownOpen && (
                                    <ul className="absolute top-10 left-0 bg-gray-700 text-white rounded shadow-lg p-2 space-y-2">
                                        <li>
                                            <Link
                                                to="/apply-id"
                                                className="block text-green-500 font-semibold px-4 py-2 hover:bg-gray-600"
                                                onClick={handleLinkClick}
                                            >
                                                Apply ID
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/id-finder"
                                                className="block text-green-500 font-semibold px-4 py-2 hover:bg-gray-600"
                                                onClick={handleLinkClick}
                                            >
                                                ID Finder
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/kra-finder"
                                                className="block text-green-500 font-semibold px-4 py-2 hover:bg-gray-600"
                                                onClick={handleLinkClick}
                                            >
                                                KRA Finder
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <Link to="/passport-finder" className="text-2xl text-sky-500 font-semibold hover:text-blue-400" onClick={handleLinkClick}>
                                    Passport
                                </Link>
                            </li>
                            <li>
                                <Link to="/report" className="text-2xl font-semibold text-red-500 hover:text-blue-400" onClick={handleLinkClick}>
                                    Report
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-2xl text-teal-300 font-semibold hover:text-blue-400" onClick={handleLinkClick}>
                                    Contact Us
                                </Link>
                            </li>
                            {/* User Icon */}
                            <li>
                                <Link to="/my-profile">
                                    <img
                                        src=""
                                        alt="User Icon"
                                        className="w-10 h-10 rounded-full border-2 border-gray-500 hover:border-white cursor-pointer"
                                    />
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Navbar Button */}
                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-3xl text-white">
                        {isMobileMenuOpen ? 'X' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}

            <div
                className={`lg:hidden fixed top-0 right-0 bg-gray-800 text-white w-3/4 h-full flex flex-col items-center justify-start pt-20 gap-6 transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {token && (
                    <>
                        <Link to="/my-profile">
                            <img
                                src=""
                                alt="User Icon"
                                className="w-10 h-10 rounded-full border-2 border-gray-500 hover:border-white cursor-pointer transition-all duration-300 ease-in-out"
                                onClick={handleLinkClick}
                            />
                        </Link>
                    </>
                )}
                <Link to="/" className="px-4 py-2 rounded-full text-white font-semibold text-lg" onClick={handleLinkClick}>
                    Home
                </Link>
                {!token && (
                    <>
                        <div className="text-white flex flex-col items-center gap-4 mt-0">
                            <Link to="/login" className="px-7 py-2 rounded font-semibold transition-all duration-300 ease-in-out" onClick={handleLinkClick}>
                                Login
                            </Link>
                            <Link to="/sign-up" className="px-6 py-2 rounded font-semibold transition-all duration-300 ease-in-out" onClick={handleLinkClick}>
                                Sign Up
                            </Link>
                            <Link to="/about" className="px-6 py-2 rounded font-semibold  transition-all duration-300 ease-in-out" onClick={handleLinkClick}>
                                About Us
                            </Link>
                        </div>
                    </>
                )}
                {token && (
                    <>
                        <div className="w-full">
                            <button
                                className="w-full text-lg text-green-500 font-semibold flex items-center justify-center"
                                onClick={toggleIdDropdown}
                            >
                                ID Finder
                                <span
                                    className={`ml-2 w-6 h-6 transform transition-transform duration-300 ${isIdDropdownOpen ? 'rotate-180' : ''}`}
                                >
                                    ▼
                                </span>
                            </button>
                            {isIdDropdownOpen && (
                                <ul className="mt-2 space-y-2 text-center">
                                    <li>
                                        <Link
                                            to="/apply-id"
                                            className="block text-lg font-semibold text-green-500 px-4 py-2 hover:bg-gray-600 rounded"
                                            onClick={handleLinkClick}
                                        >
                                            Apply ID
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/id-finder"
                                            className="block font-semibold text-lg px-4 py-2 hover:bg-gray-600 text-green-500 rounded"
                                            onClick={handleLinkClick}
                                        >
                                            ID Finder
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/kra-finder"
                                            className="block font-semibold text-lg px-4 py-2 hover:bg-gray-600 text-green-500 rounded"
                                            onClick={handleLinkClick}
                                        >
                                            KRA Finder
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <Link to="/passport-finder" className="px-4 py-2 rounded-full text-sky-500 font-semibold text-lg" onClick={handleLinkClick}>
                            Passport
                        </Link>
                        <Link to="/report" className="px-4 py-2 rounded-full text-red-500 font-semibold text-lg" onClick={handleLinkClick}>
                            Report
                        </Link>
                        <Link to="/contact" className="px-4 py-2 rounded-full text-blue-600 font-semibold text-lg" onClick={handleLinkClick}>
                            Contact Us
                        </Link>
                    </>
                )}
            </div>

        </div>
    );
};

export default Navbar;
