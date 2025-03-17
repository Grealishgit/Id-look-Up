import React, { useState } from "react";
import { FaGift, FaBook, FaUser, FaSignOutAlt, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { MdAccountBalance, MdDashboard, MdOutlineQuestionAnswer } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { SiTiktok, SiYoutube, SiNetflix } from "react-icons/si";
import { RiInstagramFill, RiMoneyDollarBoxFill, RiStockLine } from "react-icons/ri";
import { TbCircleArrowRightFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isCollapsed, isSidebarOpen, closeSidebar }) => {
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    const NavItem = ({ icon, label, dropdown, isOpen, onClick, children }) => (
        <div>
            <div
                className={`flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer p-2 hover:bg-gray-700 rounded-md transition-all duration-300
            ${isCollapsed && !isSidebarOpen ? "pl-3" : "pl-4"}`}
                onClick={onClick}
            >
                <div className="w-6 flex justify-start">{icon}</div>
                {(!isCollapsed || isSidebarOpen) && <span>{label}</span>}
                {dropdown && (!isCollapsed || isSidebarOpen) && <span className="ml-auto">{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>}
            </div>
            {(!isCollapsed || isSidebarOpen) && isOpen && <div className="ml-6 text-gray-400">{children}</div>}
        </div>
    );

    const navigate = useNavigate();

    return (
        <div
            className={`bg-[#1B1E32] text-white fixed top-0 left-0 h-screen transition-all duration-300 z-50
            ${isCollapsed && !isSidebarOpen ? "w-[6rem]" : "w-64"}
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:relative md:translate-x-0 md:block overflow-hidden`}
        >
            {/* Fixed Logo Section */}
            <div className="p-5 border-b border-gray-500 sticky top-0 bg-[#1B1E32] z-10">
                <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
                    <div className="w-auto h-8 flex items-left justify-center">
                        {isCollapsed ? (
                            <img onClick={() => {
                                navigate("/dashboard");
                                closeSidebar();
                            }}
                                src={null} alt="logo" className="w-8 object-contain" />
                        ) : (
                            <img onClick={() => {
                                navigate("/dashboard");
                                closeSidebar();
                            }}
                                src={null} alt="logo" className="h-8 object-contain" />
                        )}
                    </div>
                </div>
            </div>

            {/* Scrollable Navigation */}
            <div className="overflow-y-auto cursor-pointer scrollbar-hide h-[calc(100vh-80px)] p-5">
                <div className="mt-3 mb-2">
                    <p className="text-[10px] font-bold">MAIN</p>
                </div>

                <nav className="space-y-4">
                    <NavItem
                        onClick={() => {
                            navigate("/dashboard");
                            closeSidebar();
                        }}
                        icon={<MdDashboard />}
                        label="Dashboard"
                    />
                    <NavItem
                        icon={<RiMoneyDollarBoxFill />}
                        label="Applications"
                        dropdown
                        isOpen={openMenus.accountRecharge}
                        onClick={() => toggleMenu("accountRecharge")}
                    >
                        <div
                            onClick={() => {
                                navigate("/deposit");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Deposit Funds
                        </div>
                        <div
                            onClick={() => {
                                navigate("/payment-transaction");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Payment Transaction
                        </div>
                        <div
                            onClick={() => {
                                navigate("/deduction-history");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Deduction History
                        </div>
                    </NavItem>
                    <NavItem
                        icon={<MdAccountBalance />}
                        label="Withdrawals"
                        dropdown
                        isOpen={openMenus.withdrawals}
                        onClick={() => toggleMenu("withdrawals")}
                    >
                        <div
                            onClick={() => {
                                navigate("/withdraw-balance");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 mb-2 ml-5 hover:text-green-500"
                        >
                            - Withdraw Balance
                        </div>
                        <div
                            onClick={() => {
                                navigate("/withdraw-youtube");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 mb-2 ml-5 hover:text-green-500"
                        >
                            - Withdraw YouTube
                        </div>
                        <div
                            onClick={() => {
                                navigate("/withdraw-netflix");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Withdraw Netflix Ads
                        </div>
                        <div
                            onClick={() => {
                                navigate("/withdraw-tiktok");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Withdraw Tiktok
                        </div>
                        <div
                            onClick={() => {
                                navigate("/withdraw-insta");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Withdraw Instagram Reels
                        </div>
                        <div
                            onClick={() => {
                                navigate("/withdraw-history");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Withdrawal History
                        </div>
                    </NavItem>
                    <NavItem
                        icon={<GoPeople />}
                        label="Downlines"
                        dropdown
                        isOpen={openMenus.downlines}
                        onClick={() => toggleMenu("downlines")}
                    >
                        <div
                            onClick={() => {
                                navigate("/level-one");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Level One
                        </div>
                        <div
                            onClick={() => {
                                navigate("/level-two");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Level Two
                        </div>
                        <div
                            onClick={() => {
                                navigate("/level-three");
                                closeSidebar();
                            }}
                            className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500"
                        >
                            - Level Three
                        </div>
                    </NavItem>

                    <NavItem onClick={() => { navigate('/claim-bonus'); closeSidebar(); }} icon={<FaGift />} label="Claim Bonus" />
                    <NavItem onClick={() => { navigate('/instagram-reels'); closeSidebar(); }} icon={<RiInstagramFill />} label="Instagram Reels" />

                    <NavItem icon={<MdOutlineQuestionAnswer />} label="Trivia Questions" dropdown isOpen={openMenus.trivia} onClick={() => toggleMenu("trivia")}>
                        <div onClick={() => { navigate('/partake-trivia'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">- Partake Trivia</div>
                        <div onClick={() => { navigate('/trivia-history'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">- Trivia History</div>
                    </NavItem>

                    <NavItem icon={<SiYoutube />} label="YouTube Videos" dropdown isOpen={openMenus.youtube} onClick={() => toggleMenu("youtube")}>
                        <div onClick={() => { navigate('/youtube-videos'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">- YouTube Videos</div>
                        <div onClick={() => { navigate('/youtube-history'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">- History</div>
                    </NavItem>

                    <NavItem icon={<SiTiktok />} label="Tiktok Videos" dropdown isOpen={openMenus.tiktok} onClick={() => toggleMenu("tiktok")}>
                        <div onClick={() => { navigate('/tiktok-videos'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5  mb-2 hover:text-green-500">- Tiktok Videos</div>
                        <div onClick={() => { navigate('/tiktok-history'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">- History</div>
                    </NavItem>

                    <NavItem onClick={() => { navigate('/forex-trading'); closeSidebar(); }} icon={<RiStockLine />} label="Forex Trading" />

                    <NavItem icon={<SiNetflix />} label="Netflix Ads" dropdown isOpen={openMenus.netflix} onClick={() => toggleMenu("netflix")}>
                        <div onClick={() => { navigate('/view-ads'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">- View Ad</div>
                        <div onClick={() => { navigate('/ad-history'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">- History</div>
                    </NavItem>

                    <NavItem onClick={() => { navigate('/e-books'); closeSidebar(); }} icon={<FaBook />} label="E-books" />

                    <NavItem icon={<TbCircleArrowRightFilled />} label="Spin And Win" dropdown isOpen={openMenus.spin} onClick={() => toggleMenu("spin")}>
                        <div onClick={() => { navigate('/spin-and-win'); closeSidebar(); }} className="text-md font-semibold mt-2 ml-5 mb-2 hover:text-green-500">- Spin and Win</div>
                    </NavItem>

                    <NavItem onClick={() => { navigate('/profile'); closeSidebar(); }} icon={<FaUser />} label="Profile" />
                    <NavItem onClick={() => { navigate('/login'); closeSidebar(); }} icon={<FaSignOutAlt />} label="Log Out" />
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;