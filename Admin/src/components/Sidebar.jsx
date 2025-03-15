import React from 'react';

const Sidebar = () => {
    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-blue-600 text-white p-4 shadow-lg">
            <ul className="space-y-4 text-lg font-medium">
                <li><a href="#" className="hover:text-gray-200">Dashboard</a></li>
                <li><a href="#" className="hover:text-gray-200">Profile</a></li>
                <li><a href="#" className="hover:text-gray-200">Settings</a></li>
                <li><a href="#" className="hover:text-gray-200">Logout</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
