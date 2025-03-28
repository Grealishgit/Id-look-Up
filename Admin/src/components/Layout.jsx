import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState("");

    return (
        <>
            {/* Main Layout Wrapper */}
            <div className={`h-screen flex
                ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}
                `}>
                {/* Sidebar (Fixed) */}
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

                {/* Main Content Section */}
                <main className={`flex-0 flex-grow 
                    ${isDarkMode ? "bg-gray-700 border-gray-300" : "bg-gray-100 border-orange-400"}
                    border-l  overflow-y-auto `}>
                    <Outlet context={{ isDarkMode, setIsDarkMode }} />
                </main>
            </div>

        </>

    );
};

export default Layout;
