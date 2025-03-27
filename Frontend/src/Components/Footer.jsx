import React from 'react';


const Footer = () => {
    const token = localStorage.getItem('token');
    return (
        <div className="bg-gray-800 text-white py-8 mt-12  0 w-full">
            <div className="max-w-screen-xl mx-auto px-6">
                {/* Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* About Section */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">About Us</h3>
                        <p className="text-lg text-gray-300">
                            ID Look-Up helps you easily recover your lost documents with a few clicks.
                            Our mission is to provide a quick and reliable service for finding your essential IDs and documents.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    {token && (
                        <>
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
                                <ul className="text-lg space-y-1 grid grid-cols-2 sm:grid-cols-2 ">
                                    <li><a href="/" className="text-gray-300 hover:text-green-500">Home</a></li>
                                    <li><a href="/id-finder" className="text-gray-300 hover:text-green-500">ID Finder</a></li>
                                    <li><a href="/passport-finder" className="text-gray-300 hover:text-green-500">Passport Finder</a></li>
                                    <li><a href="/about" className="sm:hidden lg:visible text-gray-300 hover:text-green-500">About Us</a></li>
                                    <li><a href="/contact" className="text-gray-300 hover:text-green-500">Contact Us</a></li>
                                    <li><a href="/report" className="text-gray-300 hover:text-green-500">Report A Problem</a></li>
                                </ul>
                            </div>
                        </>)}
                    {/* Contact Section */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
                        <p className="text-lg text-gray-300 mb-4">
                            Email us at: <a href="mailto:support@idlookup.com" className="text-blue-400">support@idlookup.com</a>
                        </p>
                        <p className="text-lg text-gray-300">
                            Visit us at your nearest Huduma Center for assistance.
                        </p>
                    </div>
                </div>

                {/* Social Media and Copyright Section */}
                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <div className="flex justify-center space-x-6 mb-4">
                        {/* Social Media Icons */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500">
                            <i className="fab fa-facebook-f text-xl"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                            <i className="fab fa-twitter text-xl"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-700">
                            <i className="fab fa-linkedin-in text-xl"></i>
                        </a>
                    </div>

                    {/* Copyright Info */}
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg flex gap-2 items-center justify-center">
                        &copy; 2025 ID Look-Up. Developed with&nbsp;
                        ❤️ by HunterInc-Developers. All Rights Reserved. 
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Footer;
