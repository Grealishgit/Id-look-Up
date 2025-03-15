import React from 'react';
import { FaHome, FaTasks, FaUserShield, FaExclamationTriangle, FaWrench, FaCogs, FaList, FaTh, FaChartBar, FaMapMarkerAlt, FaIcons } from "react-icons/fa";
import { IoMdApps } from "react-icons/io";
import { BsGrid } from "react-icons/bs";

const Sidebar = () => {
    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-[#0b132b] text-white p-4 shadow-lg">
            {/* Logo */}
            <div className="flex items-center gap-2 text-xl font-bold mb-6">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                <span>Admin Dashboard</span>
            </div>

            {/* Navigation */}
            <ul className="space-y-2 font-medium">
                {/* Main */}
                <li className="text-gray-400 text-sm">MAIN</li>
                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700">
                    <span className="flex gap-2"><FaHome /> Dashboards</span>
                    <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full">12</span>
                </li>

                {/* Pages */}
                <li className="text-gray-400 text-sm mt-4">PAGES</li>
                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700">
                    <span className="flex gap-2"><FaList /> Pages</span>
                    <span className="bg-blue-500 text-xs px-2 py-0.5 rounded-full">New</span>
                </li>
                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700">
                    <span className="flex gap-2"><FaTasks /> Task</span>
                    <span className="bg-blue-500 text-xs px-2 py-0.5 rounded-full">New</span>
                </li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><FaUserShield /> Authentication</li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><FaExclamationTriangle /> Error</li>

                {/* General */}
                <li className="text-gray-400 text-sm mt-4">GENERAL</li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><FaWrench /> UI Elements</li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><FaCogs /> Utilities</li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><FaList /> Forms</li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><BsGrid /> Advanced UI</li>
                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700">
                    <span className="flex gap-2"><FaTh /> Widgets</span>
                    <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">Hot</span>
                </li>

                {/* Web Apps */}
                <li className="text-gray-400 text-sm mt-4">WEB APPS</li>
                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700">
                    <span className="flex gap-2"><IoMdApps /> Apps</span>
                    <span className="bg-blue-500 text-xs px-2 py-0.5 rounded-full">New</span>
                </li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><BsGrid /> Nested Menu</li>

                {/* Tables & Charts */}
                <li className="text-gray-400 text-sm mt-4">TABLES & CHARTS</li>
                <li className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-700">
                    <span className="flex gap-2"><FaTh /> Tables</span>
                    <span className="bg-green-500 text-xs px-2 py-0.5 rounded-full">3</span>
                </li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><FaChartBar /> Charts</li>

                {/* Maps & Icons */}
                <li className="text-gray-400 text-sm mt-4">MAPS & ICONS</li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><FaMapMarkerAlt /> Maps</li>
                <li className="p-2 rounded-lg hover:bg-gray-700 flex gap-2"><FaIcons /> Icons</li>
            </ul>
        </div>
    );
};

export default Sidebar;
