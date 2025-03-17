import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMoon, FaShoppingCart, FaBell, FaCog } from "react-icons/fa";
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";
import { IoLanguage } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { LuExpand } from "react-icons/lu";
import { FiUser, FiLock } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { RiSettings2Line } from "react-icons/ri";

const Navbar = ({ isCollapsed, toggleSidebar, isSidebarOpen, toggleSidebarVisibility }) => {
    const navigate = useNavigate();

    const [isProfileOpen, setIsProfileOpen] = useState(false);


    return (
        <div className={`fixed top-0 left-0 ${isCollapsed ? "md:left-24" : "md:left-64"} right-0 flex justify-between items-center bg-white shadow-md px-4 md:px-10 p-4 transition-all duration-300 z-50`}>
            {/* Left Section */}
            <div className="flex items-center gap-3">
                <button
                    className="text-gray-600 cursor-pointer text-2xl flex items-center"
                    onClick={() => {
                        toggleSidebar();
                        toggleSidebarVisibility();
                    }}
                >
                    {isSidebarOpen ? <RiMenu2Fill /> : <RiCloseFill />}
                </button>
                <div className="relative hidden sm:block">
                    <input
                        type="text"
                        placeholder="Search anything here ..."
                        className="w-40 md:w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg bg-white focus:outline-gray-200 focus:ring-1 focus:ring-gray-100"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Visible on large screens (md and above) */}
                <div className="hidden md:flex gap-4">
                    <IconButton icon={<IoLanguage />} />
                    <IconButton icon={<FaMoon />} />
                    <IconButton icon={<FaShoppingCart />} badge={0} />
                    <IconButton icon={<FaBell />} badge={5} />
                    <IconButton icon={<LuExpand />} />
                </div>

                {/* Visible on small screens */}
                <div className="flex md:hidden gap-4">
                    <IconButton icon={<CiSearch />} />
                    <IconButton icon={<IoLanguage />} />
                    <IconButton icon={<FaMoon />} />
                </div>

                {/* Profile Avatar with Dropdown */}
                <div className="relative">
                    <ProfileAvatar onClick={() => setIsProfileOpen(!isProfileOpen)} />
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg py-2 overflow-visible">
                            <div className="px-4 py-2 text-center border-b">
                                <p className="text-sm font-semibold">USER</p>
                                <p className="text-blue-500 text-md">FlexiMula <span className="font-bold">AGENCIES</span></p>
                            </div>
                            <MenuItem onClick={() => { navigate('/'); setIsProfileOpen(false); }} icon={<FiUser />} label="Profile" />
                            <MenuItem onClick={() => { navigate('/'); setIsProfileOpen(false); }} icon={<RiSettings2Line />} label="Settings" />
                            <MenuItem onClick={() => { navigate('/'); setIsProfileOpen(false); }} icon={<MdHelpOutline />} label="Helpdesk (Ticket System)" />
                            <MenuItem onClick={() => { navigate('/'); setIsProfileOpen(false); }} icon={<FiLock />} label="Log Out" />
                        </div>
                    )}
                </div>

                <IconButton icon={<FaCog />} />
            </div>
        </div>
    );
};

// Reusable Icon Button
const IconButton = ({ icon, badge }) => (
    <div className="relative p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200">
        {icon}
        {badge !== undefined && badge > 0 && (
            <span className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-1 rounded-full">
                {badge}
            </span>
        )}
    </div>
);

// Profile Avatar Component
const ProfileAvatar = ({ onClick }) => (
    <div
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer flex items-center justify-center bg-gray-300 text-white font-bold"
        onClick={onClick}
    >
        U
    </div>
);

// Dropdown Menu Item Component
const MenuItem = ({ icon, label, onClick }) => (
    <div
        className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-500 cursor-pointer transition-all duration-200"
        onClick={onClick}
    >
        <span className="mr-3 text-lg">{icon}</span>
        {label}
    </div>
);

export default Navbar;
