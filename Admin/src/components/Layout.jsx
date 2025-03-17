import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768); // Open on desktop, closed on mobile

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 768); // Adjust on resize
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleSidebarVisibility = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar (Fixed) */}
            <Sidebar
                isCollapsed={isCollapsed}
                isSidebarOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
            />

            {/* Main Content - Scrollable */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Navbar (Fixed at the top) */}
                <Navbar
                    isCollapsed={isCollapsed}
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebarVisibility={toggleSidebarVisibility}
                />


                <main className="flex-1 flex-grow overflow-y-auto p-6 bg-gray-100">
                    <Outlet />
                </main>

                {/* Footer */}

            </div>
        </div>
    );
};

export default Layout;