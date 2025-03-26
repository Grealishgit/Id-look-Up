import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import RecentUserCard from "../pages/TableCards/RecentUserCard";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState("");

    return (
        <>
            {/* Main Layout Wrapper */}
            <div className="h-screen flex bg-[#F3F5F7]">
                {/* Sidebar (Fixed) */}
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

                {/* Main Content Section */}
                <main className="flex-0 flex-grow border-l border-gray-500 overflow-y-auto bg-gray-100">
                    <Outlet context={{ isDarkMode, setIsDarkMode }} />
                </main>
            </div>

        </>

    );
};

export default Layout;
