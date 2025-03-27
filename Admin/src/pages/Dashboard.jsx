import React, { useEffect, useState } from "react";
import { FiUser, FiEye, FiBarChart2 } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import RecentReportsCard from "./TableCards/RecentReportsCard";
import RecentApplicationsCard from "./TableCards/RecentApplicationsCard";
import RecentUserCard from "./TableCards/RecentUserCard";
import { ChevronDown } from "lucide-react";

const data = [
    { county: "Nairobi", age: 45 },
    { county: "Mombasa", age: 38 },
    { county: "Kisumu", age: 52 },
    { county: "Nakuru", age: 60 },
    { county: "Eldoret", age: 41 },
    { county: "Others", age: 35 }
];



const doughnutOptions = {
    cutout: "80%",
    plugins: {
        legend: {
            display: false,
        },
    },
};

const Dashboard = () => {
    const { isDarkMode } = useOutletContext();
    const [analyticsData, setAnalyticsData] = useState({
        totalUsers: 0,
        totalApplications: 0,
        totalReports: 0,
        bounceRate: 77.3,
        impressions: 9903,
        clicks: 16789,
        users: 0,
        usersPerGender: {
            Male: 0,
            Female: 0,
            Other: 0,
        },
    });

    // Define `doughnutData` separately
    const doughnutData = {
        labels: ["Male", "Female", "Other"],
        datasets: [
            {
                data: [
                    analyticsData.usersPerGender.Male || 0,
                    analyticsData.usersPerGender.Female || 0,
                    analyticsData.usersPerGender.Other || 0,
                ],
                backgroundColor: ["#4A90E2", "#dc104b", "#F5A623"],
                hoverBackgroundColor: ["#357ABD", "#3CB371", "#D48F0C"],
                borderWidth: 2,
            },
        ],
    };
    const [activeTab, setActiveTab] = useState("Recent Users");
    const [isOpen, setIsOpen] = useState(false);
    const [topCounty, setTopCounty] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [topPassportCounty, setTopPassportCounty] = useState(null);
    const [passportPercentage, setPassportPercentage] = useState(0);

    //Getting All Users
    const fetchTotalUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-users`);
            const { Male = 0, Female = 0, Other = 0 } = response.data?.data || {};
            const totalUsers = response.data?.totalUsers || 0;

            setAnalyticsData((prev) => ({
                ...prev,
                users: totalUsers,
                usersPerGender: { Male, Female, Other },
            }));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchTotalUsers();
    }, []);
    //Getting All Applications
    const fetchTotalApplications = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/applications`);
            const totalApplications = response.data.data.lostIdApplications.length + response.data.data.formUploads.length;
            setAnalyticsData((prev) => ({
                ...prev,
                totalApplications,
            }));
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    useEffect(() => {
        fetchTotalApplications();
    }, []);

    //Getting All Reports
    const fetchReports = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reports`);
            // Ensure you use the exact keys returned by the backend
            const totalReports =
                response.data.data.lostIdReports.length + response.data.data.lostPassportReports.length;

            setAnalyticsData((prev) => ({
                ...prev,
                totalReports,
            }));
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    // Call the function inside useEffect properly
    useEffect(() => {
        fetchReports();
    }, []);



    useEffect(() => {
        const fetchIdReports = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reported-ids`);
                const result = await response.json();

                if (result.success) {
                    const lostIds = result.data;

                    // Count reports per county
                    const countyCounts = lostIds.reduce((acc, { lostCounty }) => {
                        acc[lostCounty] = (acc[lostCounty] || 0) + 1;
                        return acc;
                    }, {});

                    // Find the county with the most lost ID reports
                    const topCountyName = Object.keys(countyCounts).reduce((a, b) =>
                        countyCounts[a] > countyCounts[b] ? a : b
                    );

                    const topCountyCount = countyCounts[topCountyName];
                    const totalReports = lostIds.length;
                    const calculatedPercentage = ((topCountyCount / totalReports) * 100).toFixed(1);

                    setTopCounty(topCountyName);
                    setPercentage(calculatedPercentage);
                }
            } catch (error) {
                console.error("Error fetching lost ID reports:", error);
            }
        };

        fetchIdReports();
    }, []);


    //Progress bar for the Top County with most lost Passports
    useEffect(() => {
        const fetchPassportReports = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reported-passports`);
                const result = await response.json();

                if (result.success) {
                    const lostPassports = result.data;

                    // Count reports per county
                    const countyCount = lostPassports.reduce((acc, { lostCounty }) => {
                        acc[lostCounty] = (acc[lostCounty] || 0) + 1;
                        return acc;
                    }, {});

                    // Find the county with the most lost passport reports
                    const topPassportCountyName = Object.keys(countyCount).reduce((a, b) =>
                        countyCount[a] > countyCount[b] ? a : b
                    );

                    const topCountyCount = countyCount[topPassportCountyName];
                    const totalReports = lostPassports.length;
                    const calculatedPercentage = ((topCountyCount / totalReports) * 100).toFixed(1);

                    setTopPassportCounty(topPassportCountyName);
                    setPassportPercentage(calculatedPercentage);
                }
            } catch (error) {
                console.error("Error fetching lost passport reports:", error);
            }
        };

        fetchPassportReports();
    }, []);

    return (

        <div >
            <div className={` border-2 rounded-md border-[rgba(0,0,0,0.08)] h-full p-8 shadow-sm flex flex-col items-center justify-center
      ${isDarkMode ? 'bg-gray-700 text-gray-200 border-[#444]' : 'bg-gray-100 text-gray-800 border-[rgba(0,0,0,0.08)]'}    
        `}>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Analytics</h2>
            {/* Analytics Dashboard */}
            <div className="flex flex-col lg:flex-row gap-6 w-full mt-6">
                {/* Left Section (Analytics Cards) */}
                <div className="w-full lg:w-1/2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Total Users */}
                            <div className={` p-4 sm:p-6 rounded-lg 
                            ${isDarkMode ? "bg-gray-600 " : "bg-white"}
                            shadow flex flex-col`}>
                            <div className="flex justify-between">
                                    <h4 className="text-base sm:text-lg font-medium ">Total <br /> Users</h4>
                                    <FiUser className="text-xl sm:text-2xl" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">{analyticsData.users.toLocaleString()}</h2>
                        </div>

                        {/* Total Applications */}
                            <div className={` p-4 sm:p-6 rounded-lg 
                            ${isDarkMode ? "bg-gray-600 " : "bg-white"}
                            shadow flex flex-col`}>
                            <div className="flex justify-between">
                                    <h4 className="text-base sm:text-lg font-medium ">Total Applications</h4>
                                    <FiEye className=" text-xl sm:text-2xl" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">{analyticsData.totalApplications.toLocaleString()}</h2>
                        </div>

                        {/* Total Reports */}
                            <div className={` p-4 sm:p-6 rounded-lg 
                            ${isDarkMode ? "bg-gray-600 " : "bg-white"}
                            shadow flex flex-col`}>
                            <div className="flex justify-between">
                                    <h4 className="text-base sm:text-lg font-medium">Total Reports</h4>
                                    <FiBarChart2 className=" text-xl sm:text-2xl" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">{analyticsData.totalReports.toLocaleString()}</h2>
                        </div>
                    </div>

                    {/* Audience Report */}
                        <div className={`p-3 sm:p-6 
                        ${isDarkMode ? "bg-gray-600" : "bg-white "}
                        rounded-lg shadow mt-6`}>
                        <div className="flex justify-between">
                                <h4 className="text-md sm:text-lg font-medium ">User Age Distribution</h4>
                                <button className="px-3 sm:px-4 py-1 sm:py-2 cursor-pointer bg-orange-600 text-white text-sm rounded-lg ">
                                Export
                            </button>
                        </div>
                            <div className="h-50 cursor-pointer mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="county" />
                                        <YAxis domain={[18, 100]} />
                                    <Tooltip />
                                    <Bar dataKey="age" fill="#03a9f4" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>



                </div>

                {/* Right Section (Distribution of Users by Gender) */}
                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Plan Expiring */}
                    <div className="flex flex-col  gap-4 sm:gap-6">
                            <div className={` h-50 p-4 sm:p-6 
                                ${isDarkMode ? "bg-gray-600" : "bg-emerald-400"}
                                rounded-lg shadow flex flex-col justify-center`}>
                            <h4 className="text-base sm:text-lg font-medium">Top-County ID Reports</h4>
                            <p className="mt-2 text-md">{topCounty || "Loading..."}</p>

                            {/* Progress Bar */}
                            <div className="w-full bg-white rounded-full h-8 mt-4">
                                <div
                                    className="bg-orange-400 h-8 rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>

                            <p className="mt-2 text-sm">{percentage}%</p>
                        </div>

                            <div className={`h-60 p-4 sm:p-6
                             ${isDarkMode ? "bg-gray-600" : "bg-orange-400"}
                            rounded-lg shadow text-white flex flex-col justify-center`}>
                            <h4 className="text-base sm:text-lg font-medium">Top-County Passport Reports</h4>
                            <p className="mt-2 text-md">{topPassportCounty || "Loading..."}</p>

                            {/* Progress Bar */}
                            <div className="w-full bg-white rounded-full h-8 mt-4">
                                <div
                                    className="bg-emerald-400 h-8 rounded-full transition-all duration-500"
                                    style={{ width: `${passportPercentage}%` }}
                                ></div>
                            </div>

                            <p className="mt-2 text-sm">{passportPercentage}%</p>
                        </div>
                    </div>

                    {/* Sessions By Device */}

                        <div className={` p-4 sm:p-6
                        ${isDarkMode ? "bg-gray-600" : "bg-white"}
                        rounded-lg shadow`}>
                            <h4 className="text-base sm:text-lg font-medium ">Users Per Gender</h4>
                            <button className={`mt-2 flex gap-2
                                ${isDarkMode ? "bg-gray-500" : "bg-purple-200"}
                                rounded-md items-center font-semibold px-3 sm:px-5 py-1 sm:py-2 text-sm`}>
                                View All 
                                <ChevronDown
                                    onClick={() => setIsOpen(!isOpen)}
                                    className={`cursor-pointer transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                />
                        </button>

                        {/* Chart Container */}
                            <div className="relative h-48 sm:h-64 flex items-center  justify-center mt-4">
                            <Doughnut data={doughnutData} options={doughnutOptions} />

                            {/* Total Count in the Center */}
                            <div className="absolute text-center">
                                    <h2 className="sm:text-2xl text-md font-bold ">
                                        {analyticsData.users} Users
                                </h2>
                                    <p className=" md:text-md text-sm">Gender Distributions</p>
                            </div>
                        </div>

                        {/* Display Gender Percentage */}
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 w-full overflow-hidden">
                                {Object.entries(analyticsData.usersPerGender).map(([gender, count]) => {
                                    const percentage = ((count / analyticsData.users) * 100).toFixed(2);
                                    return (
                                        <div key={gender} className="flex items-center space-x-2">
                                            <span className="font-medium">
                                                {gender.charAt(0).toUpperCase() + gender.slice(1)}:
                                            </span>
                                            <span className={`${isDarkMode ? "" : "text-green-600"} font-bold text-md`}>
                                                {percentage}%
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                    </div>


                </div>
                </div>

                <div className="overflow-x-auto w-full">
                {/* Tabs */}
                    <div className="flex mt-2 ">
                    {["Recent Users", "Recent Reports", "Recent Applications"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 cursor-pointer text-md font-medium ${activeTab === tab ? "text-orange-600 border-b-4 border-orange-600" : ""}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                    {/* Tab Content */}
                    {/* Parent container for responsiveness */}
                    <div className=" w-full  overflow-x-auto">
                        {activeTab === "Recent Users" && <RecentUserCard />}
                        {activeTab === "Recent Reports" && <RecentReportsCard />}
                        {activeTab === "Recent Applications" && <RecentApplicationsCard />}
                    </div>

                </div>

            </div>
        </div>

    );
};

export default Dashboard;