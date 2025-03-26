import { ChevronDown, ClipboardPlus, FileInput, FileSearch, FileUser, LayoutDashboard, Menu, Moon, Settings, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen, isDarkMode, setIsDarkMode }) => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState('');

    const navItems = [
        { title: 'Dashboard', icon: LayoutDashboard, hasDropdown: false, route: '/' },
        {
            title: 'Applications',
            icon: FileUser,
            hasDropdown: true,
            dropdownItems: [
                { label: 'ID Applications', route: '/id-applications' },
                { label: 'KRA Applications', route: '/kra-applications' },
                { label: 'DL Renewal', route: '/dl-renewals' }
            ]
        },
        {
            title: 'Reports',
            icon: ClipboardPlus,
            hasDropdown: true,
            dropdownItems: [
                { label: 'Lost IDs', route: '/lost-id' },
                { label: 'Lost Passports', route: '/lost-passports' },
                { label: 'Lost DL', route: '/lost-dl' },
                { label: 'Lost Certificates', route: '/lost-certificates' }
            ]
        },
        {
            title: 'Findings',
            icon: FileSearch,
            hasDropdown: true,
            dropdownItems: [
                { label: 'IDs Collected', route: '/ids-collected' },
                { label: 'Passports Collected', route: '/passports-collected' },
                { label: 'DL Collected', route: '/dl-collected' }
            ]
        },
        {
            title: 'Entries',
            icon: FileInput,
            hasDropdown: true,
            dropdownItems: [
                { label: 'IDs', route: '/entries/ids' },
                { label: 'Passports', route: '/entries/passports' },
                { label: 'DLs', route: '/entries/dls' },
                { label: 'Certificates', route: '/entries/certificates' }
            ]
        },
        { title: 'Settings', icon: Settings, hasDropdown: false, route: '/settings' }
    ];

    const toggleDropdown = (title) => {
        setActiveDropdown(activeDropdown === title ? '' : title);
    };

    return (
        <div
            className={`transition-all duration-300 ease-in-out text-lg border-2 z-50
        ${isDarkMode ? 'bg-gray-700 text-white border-[#444]' : 'bg-white text-black border-[rgba(0,0,0,0.08)]'}
        ${isOpen ? 'md:w-64 w-50' : 'w-17'}`}
        >
            <div className="p-5 flex justify-between items-center">
                <h1 className={`font-bold overflow-hidden transition-all duration-300 md:text-lg text-sm text-nowrap text-orange-500
          ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    DASHBOARD
                </h1>
                {isDarkMode ? (
                    <Sun size={20} className='cursor-pointer md:block hidden' onClick={() => setIsDarkMode(false)} />
                ) : (
                    <Moon size={20} className='cursor-pointer md:block hidden' onClick={() => setIsDarkMode(true)} />
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`cursor-pointer border ${isDarkMode ? "md:border-gray-500 border-gray-700 " : "md:border-gray-300 border-white"}  p-1 rounded-lg`}
                >
                    {isOpen ? <X size={25} strokeWidth={1.5} /> : <Menu size={25} strokeWidth={1.5} />}
                </button>
            </div>

            <nav className="mt-6">
                {navItems.map((item) => (
                    <div key={item.title}>
                        <div
                            className={`px-4 py-3 cursor-pointer flex items-center justify-between 
                            ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-orange-200 '}`}
                            onClick={() => {
                                if (item.hasDropdown && isOpen) {
                                    toggleDropdown(item.title);
                                } else if (!item.hasDropdown) {
                                    navigate(item.route);
                                }

                            }}
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
                                    className={`transition-transform duration-200 min-w-4 min-h-6 md:min-w-10 md:min-h-6
                                     ${activeDropdown === item.title ? 'rotate-180' : ''}`}
                                />
                            )}
                        </div>

                        {item.hasDropdown && isOpen && activeDropdown === item.title && (
                            <div className={`overflow-hidden transition-all duration-200 
                ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                                {item.dropdownItems.map((dropdownItem) => (
                                    <div
                                        key={dropdownItem.label}
                                        className={`px-11 py-2 cursor-pointer text-sm
                                            ${isDarkMode ? "hover:bg-gray-500" : "hover:bg-orange-200"}`}
                                        onClick={() => {
                                            navigate(dropdownItem.route);
                                            /* setIsOpen(false); */
                                        }}

                                    >
                                        {dropdownItem.label}
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
