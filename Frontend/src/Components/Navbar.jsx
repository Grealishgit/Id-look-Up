import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { FaAngleDown, FaFileSignature, FaHome } from "react-icons/fa";
import { FaCircleUser, FaPassport } from "react-icons/fa6";
import { IoIosNotifications, IoMdInformationCircle } from "react-icons/io";
import { MdFindInPage, MdContactMail, MdReport, MdLogin } from "react-icons/md";



const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isIdDropdownOpen, setIsIdDropdownOpen] = useState(false);

    const token = localStorage.getItem('token');

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
            {/* Navbar (Desktop & Mobile) */}
            <nav className="bg-gray-800 text-white p-4 flex items-center fixed top-0 left-0 w-full z-50">
                {/* Logo - Left */}
                <div className="font-bold text-4xl">
                    <a href="/">ID <span className="text-green-600">Look</span>-<span className="text-red-600">Up</span>.</a>
                </div>

                {/* Centered Navigation Links (Desktop) */}
                <div className="flex-1 flex justify-center">
                    <ul className="hidden lg:flex gap-6 items-center">
                        <li><Link to="/" className="text-2xl font-bold">Home</Link></li>
                        {token && (
                            <>
                                <li className="relative">
                                    <button
                                        className="text-2xl font-semibold flex items-center"
                                        onClick={toggleIdDropdown}
                                    >
                                        Finder
                                        <span className={`ml-2 w-6 h-5 transform transition-transform ${isIdDropdownOpen ? 'rotate-180' : ''}`}>
                                            <FaAngleDown />
                                        </span>
                                    </button>
                                    {isIdDropdownOpen && (
                                        <ul className="absolute top-10 left-0 bg-gray-700 text-white rounded shadow-lg p-2 space-y-2">
                                            <li><Link to="/passport-finder" className="block text-green-500 font-semibold px-4 py-2 hover:bg-gray-600">Passport Finder</Link></li>
                                            <li><Link to="/id-finder" className="block text-green-500 font-semibold px-4 py-2 hover:bg-gray-600">ID Finder</Link></li>
                                            <li><Link to="/kra-finder" className="block text-green-500 font-semibold px-4 py-2 hover:bg-gray-600">KRA Finder</Link></li>
                                        </ul>
                                    )}
                                </li>
                                <li><Link to="/applications" className="text-2xl font-semibold">Applications</Link></li>
                                <li><Link to="/report" className="text-2xl font-semibold">Report</Link></li>
                                <li><Link to="/contact" className="text-2xl font-semibold">Contact Us</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* User Icon (Right-aligned) */}
                {token && (
                    <div className="ml-auto hidden lg:flex gap-4">
                        {/* Notifications Icon */}
                        <IoIosNotifications
                            className="w-10 h-10 text-white border-2 border-gray-500 hover:border-white cursor-pointer rounded-full p-1"
                            aria-label="Notifications"
                        />

                        {/* User Profile Icon */}
                        <Link to="/my-profile" aria-label="My Profile">
                            <FaCircleUser
                                className="w-10 h-10 text-white border-2 border-gray-500 hover:border-white cursor-pointer rounded-full p-1"
                            />
                        </Link>
                    </div>

                )}

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex flex-row mt-1 gap-3 ml-4">
                    {/* User Icon (Always Visible on Small Screens) */}
                    {token &&
                        <Link to="/my-profile" className="mb-4" onClick={handleLinkClick}>
                            <FaCircleUser className="w-10 h-10 text-white border-2 border-gray-500 hover:border-white cursor-pointer rounded-full p-1" />
                        </Link>
                    }
                    {token &&
                        <IoIosNotifications className="w-10 h-10 text-white border-2 border-gray-500 hover:border-white cursor-pointer rounded-full p-1" />

                    }

                    {/* Hamburger Menu Button (Opens/Closes Mobile Menu) */}
                    <button onClick={toggleMobileMenu} className="text-3xl h-10 text-white">
                        {isMobileMenuOpen ? <IoClose /> : <RiMenu2Line />}
                    </button>
                </div>

            </nav>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed space-y-4 z-80  top-3 right-0 bg-gray-800 text-white w-1/2 h-full flex flex-col items-start pt-20 transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/*  {token && (
                    <Link to="/my-profile" className="mb-4" onClick={handleLinkClick}>
                        <FaCircleUser className="w-10 h-10 text-white border-2 border-gray-500 hover:border-white cursor-pointer rounded-full p-1" />
                    </Link>
                )} */}

                <Link to="/" className="px-4 py-2 text-2xl flex gap-2 font-semibold" onClick={handleLinkClick}>
                    <FaHome width={20} />
                    Home
                </Link>

                {token && (
                    <>
                        <button
                            className="w-full text-xl gap-3 font-semibold flex items-start ml-3 "
                            onClick={toggleIdDropdown}
                        >
                            <MdFindInPage width={60} />
                            Finder
                            <span className={`ml-2 w-6 h-6 transform transition-transform duration-300 ${isIdDropdownOpen ? 'rotate-180' : ''}`}>
                                <FaAngleDown />
                            </span>
                        </button>

                        {isIdDropdownOpen && (
                            <ul className="mt-2 space-y-4 text-start ml-10">
                                <li><Link to="/id-finder" className="block  font-semibold px-4 py-2 hover:bg-gray-600 underline rounded" onClick={handleLinkClick}>ID Finder</Link></li>
                                <li><Link to="/passport-finder" className="block font-semibold px-4 py-2 hover:bg-gray-600 underline rounded" onClick={handleLinkClick}>Passport Finder</Link></li>
                                <li><Link to="/kra-finder" className="block font-semibold px-4 py-2 hover:bg-gray-600 underline rounded" onClick={handleLinkClick}>KRA Finder</Link></li>
                            </ul>
                        )}

                        <Link to="/applications" className="px-4 py-2 flex gap-3 font-semibold text-xl" onClick={handleLinkClick}>
                            <FaPassport />
                            Applications
                        </Link>
                        <Link to="/report" className="px-4 py-2 flex gap-3 font-semibold text-xl" onClick={handleLinkClick}>
                            <MdReport />
                            Report
                        </Link>
                        <Link to="/contact" className="px-4 py-2 flex gap-3 font-semibold text-xl" onClick={handleLinkClick}>
                            <MdContactMail />
                            Contact Us
                        </Link>
                    </>
                )}

                {!token && (
                    <div className="flex flex-col items-start gap-4">
                        <Link to="/login" className="px-7 py-2 flex gap-3  rounded font-semibold" onClick={handleLinkClick}>
                            <MdLogin />
                            Login
                        </Link>
                        <Link to="/sign-up" className="px-6 py-2 flex gap-3 rounded font-semibold" onClick={handleLinkClick}>
                            <FaFileSignature />
                            Sign Up
                        </Link>
                        <Link to="/about" className="px-6 py-2 flex gap-3 rounded font-semibold" onClick={handleLinkClick}>
                            <IoMdInformationCircle />
                            About Us
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
