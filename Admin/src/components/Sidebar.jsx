import { ChevronDown, ClipboardPlus, FileInput, FileSearch, FileUser, LayoutDashboard, Menu, Moon, Settings, Sun, X } from 'lucide-react';
import { useState } from 'react';



const Sidebar = ({ isOpen, setIsOpen, isDarkMode, setIsDarkMode }) => {
    const [activeDropdown, setActiveDropdown] = useState('');

    const navItems = [
        { title: 'Dashboard', icon: LayoutDashboard, hasDropdown: false },
        {
            title: 'Applications',
            icon: FileUser,
            hasDropdown: true,
            dropdownItems: ['ID Applications', 'KRA Applications', 'DL Renewal']
        },
        {
            title: 'Reports',
            icon: ClipboardPlus,
            hasDropdown: true,
            dropdownItems: ['Lost IDs', 'Lost Passports', 'Lost Dl', 'Lost Certificates']
        },
        {
            title: 'Findings',
            icon: FileSearch,
            hasDropdown: true,
            dropdownItems: ['IDs Collected', 'Passports Collected', 'Dl Collected']
        },
        {
            title: 'Entries',
            icon: FileInput,
            hasDropdown: true,
            dropdownItems: ['IDs', 'Passports', 'DLs', 'Certificates']
        },
        { title: 'Settings', icon: Settings, hasDropdown: false },

    ];

    return (
        <div
            className={`transition-all duration-300 ease-in-out text-lg border-2 z-50
        ${isDarkMode ? 'bg-gray-700 text-white border-[#444]' : 'bg-white text-black border-[rgba(0,0,0,0.08)]'}
        ${isOpen ? 'md:w-64 w-40' : 'w-17'}`}
        >
            <div className="p-5 flex justify-between items-center">
                <h1 className={`font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap text-orange-500
          ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Dashboard
                </h1>
                {
                    isDarkMode ? <Sun size={20} className='cursor-pointer' onClick={() => setIsDarkMode(false)} />
                        : <Moon size={20} className='cursor-pointer' onClick={() => setIsDarkMode(true)} />
                }

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`cursor-pointer border ${isDarkMode ? "border-gray-500 " : "border-gray-300"}  p-1 rounded-lg`}
                >
                    {isOpen ? <X size={25} strokeWidth={1.5} /> : <Menu size={25} strokeWidth={1.5} />}
                </button>
            </div>

            <nav className="mt-6">
                {navItems.map((item) => (
                    <div key={item.title}>
                        <div
                            className={`px-4 py-3  cursor-pointer flex items-center justify-between 
                ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-orange-200 '}`}
                            onClick={() => item.hasDropdown && isOpen && setActiveDropdown(activeDropdown === item.title ? '' : item.title)}
                        >
                            <div className="flex items-center">
                                <item.icon size={20} strokeWidth={1.5} color={isDarkMode ? '#fff' : '#000'} />
                                <span className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300
                  ${isOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
                                    {item.title}
                                </span>
                            </div>
                            {item.hasDropdown && isOpen && (
                                <ChevronDown
                                    size={16}
                                    strokeWidth={1.5}
                                    className={`transition-transform duration-200 
                    ${activeDropdown === item.title ? 'rotate-180' : ''}`}
                                />
                            )}
                        </div>

                        {item.hasDropdown && isOpen && activeDropdown === item.title && (
                            <div className={`overflow-hidden transition-all duration-200 
                ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                                {item.dropdownItems.map((dropdownItem) => (
                                    <div
                                        key={dropdownItem}
                                        className={`px-11 py-2
                                            ${isDarkMode ? "hover:bg-gray-500" : "hover:bg-orange-200"}  cursor-pointer text-sm`}
                                    >
                                        {dropdownItem}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
};
export default Sidebar;