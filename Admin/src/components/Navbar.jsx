import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMoon, FaShoppingCart, FaBell, FaCog } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { LuExpand } from "react-icons/lu";
import { FiUser, FiLock } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { RiSettings2Line } from "react-icons/ri";
import { Sun } from "lucide-react";

const Navbar = ({ isOpen, setIsOpen, isDarkMode, setIsDarkMode }) => {
    const navigate = useNavigate();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
    };

    const formatTime = (date) =>
        `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
        ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    return (
        <div className={`fixed  top-0 left-0 ${isOpen ? "md:left-64" : "md:left-17 "} right-0 flex justify-between items-center
        ${isDarkMode ? "bg-gray-700 text-white" : "bg-white"}
         shadow-md px-4 md:px-10 p-4 transition-all duration-300 z-40`}>
            {/* Left Section */}
            <div className="flex items-center gap-3">

                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search anything here ..."
                        className={`w-40 md:w-80 px-4 py-2 pl-10 border  rounded-lg
                            ${isDarkMode ? "text-white focus:outline-gray-200 " : "border-gray-600 text-black focus:outline-gray-700 bg-white"}
                              focus:ring-1 focus:ring-gray-100`}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>


                <div className="md:block hidden">
                    {/* Middle: Admin Name */}
                    <div className="text-lg flex items-center ml-20 gap-2 font-semibold">
                        {/*  <RiAdminLine className="text-md items-center" /> */}
                        {/* Admin: <span className="text-green-500">Hunter</span> */}
                    </div>
                </div>


                <div className="md:block hidden">
                    <div className="flex gap-3 items-center">
                        <p className="text-orange-400 items-center font-bold text-2xl">{formatDate(dateTime)}</p>
                        <h1 className="text-2xl font-bold tracking-wide w-[90px]">{formatTime(dateTime)}</h1>
                    </div>
                </div>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Visible on large screens (md and above) */}
                <div className="hidden md:flex gap-4">
                    <IconButton icon={<IoLanguage />} />

                    {isDarkMode ? <IconButton icon={<Sun size={15} onClick={() => setIsDarkMode(false)} />} />
                        : <IconButton icon={<FaMoon onClick={() => setIsDarkMode(true)} />} />}


                    <IconButton icon={<FaShoppingCart />} badge={0} />
                    <IconButton icon={<FaBell />} badge={5} />
                    <IconButton icon={<LuExpand />} />
                </div>

                {/* Visible on small screens */}
                <div className="flex md:hidden gap-4">
                    <IconButton icon={<CiSearch />} />
                    <IconButton icon={<IoLanguage />} />
                    {isDarkMode ? <IconButton icon={<Sun size={15} onClick={() => setIsDarkMode(false)} />} />
                        : <IconButton icon={<FaMoon onClick={() => setIsDarkMode(true)} />} />}
                </div>

                {/* Profile Avatar with Dropdown */}
                <div className="relative">
                    <ProfileAvatar onClick={() => setIsProfileOpen(!isProfileOpen)} />
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg py-2 overflow-visible">
                            <div className="px-4 py-2 text-center border-b">
                                <p className="text-sm font-semibold">Admin</p>
                                <p className="text-blue-500 font-bold text-md">ID-LOOK-<span className="font-bold">UP</span></p>
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
