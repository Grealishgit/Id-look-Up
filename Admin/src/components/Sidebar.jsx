import React, { useEffect, useRef, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { MdAccountBalance, MdDashboard, MdOutlineQuestionAnswer } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { RiCloseFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isCollapsed, isSidebarOpen, closeSidebar }) => {
    const [openMenus, setOpenMenus] = useState({});
    const sidebarRef = useRef(null);

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    // **Close sidebar when clicking outside**
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                window.innerWidth < 768 // Only close sidebar on small screens
            ) {
                closeSidebar();
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    const navigate = useNavigate();

    const NavItem = ({ icon, label, dropdown, isOpen, onClick, children }) => (
        <div>
            <div
                className={`flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer p-2 hover:bg-gray-700 rounded-md transition-all duration-300
            ${isCollapsed && !isSidebarOpen ? "pl-3" : "pl-4"}`}
                onClick={onClick}
            >
                <div className="w-6 flex justify-start">{icon}</div>
                {(!isCollapsed || isSidebarOpen) && <span>{label}</span>}
                {dropdown && (!isCollapsed || isSidebarOpen) && (
                    <span className="ml-auto">{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
                )}
            </div>
            {(!isCollapsed || isSidebarOpen) && isOpen && <div className="ml-6 text-gray-400">{children}</div>}
        </div>
    );

    return (
        <div
            ref={sidebarRef}
            className={`bg-[#1B1E32] text-white fixed top-0 left-0 h-screen transition-all duration-300 z-50
    ${isCollapsed && !isSidebarOpen ? "w-[6rem]" : "w-64"}
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:relative md:translate-x-0 md:block overflow-hidden`}
        >
            {/* Close Icon */}
            <button
                className="absolute top-4 right-4 text-white z-60 text-2xl md:hidden"
                onClick={() => closeSidebar()}
            >
                <RiCloseFill />
            </button>

            {/* Fixed Logo Section */}
            <div className="p-5 border-b border-gray-500 sticky top-0 bg-[#1B1E32] z-10">
                <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
                    <div className="w-auto h-8 flex items-left justify-center">
                        {isCollapsed ? (<img onClick={() => { navigate("/"); closeSidebar(); }}                                                                               
                                src={null} alt="logo" className="w-8 object-contain" />
                        ) : (

                                <a onClick={() => { navigate("/"); closeSidebar(); }} className="font-bold ml-10 text-3xl" href="">
                                    ID-<span className=" text-orange-500 underline">LOOK</span>-UP
                                </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Scrollable Navigation */}
            <div className="overflow-y-auto cursor-pointer scrollbar-hide h-[calc(100vh-80px)] p-5">
                <div className="mt-3">
                    <p className="text-[20px] text-orange-500 ml-5 font-bold">ADMIN DASHBOARD</p>
                </div>

                <nav className="space-y-4">
                    <NavItem
                        onClick={() => { navigate("/"); closeSidebar(); }} icon={<MdDashboard />} label="Dashboard" />
                    <NavItem
                        icon={<RiMoneyDollarBoxFill />}
                        label="Applications"
                        dropdown
                        isOpen={openMenus.accountRecharge}
                        onClick={() => toggleMenu("accountRecharge")} >
                        <div
                            onClick={() => {
                                navigate("/id-applications");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - ID Applications
                        </div>
                        <div
                            onClick={() => {
                                navigate("/kra-applications");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - KRA Applications
                        </div>
                        <div
                            onClick={() => {
                                navigate("/dl-renewals");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - DL Renewal
                        </div>
                    </NavItem>
                    <NavItem
                        icon={<MdAccountBalance />}
                        label="Lost Document Reports"
                        dropdown
                        isOpen={openMenus.withdrawals}
                        onClick={() => toggleMenu("withdrawals")}
                    >
                        <div
                            onClick={() => {
                                navigate("/lost-id");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 mb-2 ml-5 hover:text-green-500"
                        >
                            - Lost ID's
                        </div>
                        <div
                            onClick={() => {
                                navigate("/lost-passports");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 mb-2 ml-5 hover:text-green-500"
                        >
                            - Lost Passports
                        </div>
                        <div
                            onClick={() => {
                                navigate("/lost-dl");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Lost DL
                        </div>



                    </NavItem>
                    <NavItem
                        icon={<GoPeople />}
                        label="Findings"
                        dropdown
                        isOpen={openMenus.downlines}
                        onClick={() => toggleMenu("downlines")}
                    >
                        <div
                            onClick={() => {
                                navigate("/");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - ID's Collected
                        </div>
                        <div
                            onClick={() => {
                                navigate("/");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Passports Collected
                        </div>
                        <div
                            onClick={() => {
                                navigate("/");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - DL collected
                        </div>
                    </NavItem>


                    <NavItem icon={<MdOutlineQuestionAnswer />}
                        label="Document Entry" dropdown isOpen={openMenus.trivia}
                        onClick={() => toggleMenu("trivia")}>
                        <div onClick={() => { navigate('/'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">
                            - Passports</div>
                        <div onClick={() => { navigate('/'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">
                            - DL</div>
                    </NavItem>




                </nav>
            </div>
        </div>
    );
};

export default Sidebar;