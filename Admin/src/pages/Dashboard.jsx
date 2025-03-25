import React, { useEffect, useState } from "react";
import { FiUser, FiEye, FiBarChart2 } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import DashboardCard from "./TableCards/RecentUserCard";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

import axios from "axios";
import RecentReportsCard from "./TableCards/RecentReportsCard";
import RecentApplicationsCard from "./TableCards/RecentApplicationsCard";

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
    const [topCounty, setTopCounty] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [topPassportCounty, setTopPassportCounty] = useState(null);
    const [passportPercentage, setPassportPercentage] = useState(0);

    //Getting All Users
    const fetchTotalUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4000/get-users");

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
            const response = await axios.get("http://localhost:4000/applications");
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
            const response = await axios.get("http://localhost:4000/reports");
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
                const response = await fetch("http://localhost:4000/reported-ids");
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
                const response = await fetch("http://localhost:4000/reported-passports");
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
        <div className="p-4 sm:p-6 bg-gray-100 mt-20 min-h-screen">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Analytics</h2>

            {/* Analytics Dashboard */}
            <div className="flex flex-col lg:flex-row gap-6 w-full mt-6">
                {/* Left Section (Analytics Cards) */}
                <div className="w-full lg:w-1/2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {/* Total Users */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col">
                            <div className="flex justify-between">
                                <h4 className="text-base sm:text-lg font-medium text-gray-700">Total <br /> Users</h4>
                                <FiUser className="text-gray-500 text-xl sm:text-2xl" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">{analyticsData.users.toLocaleString()}</h2>
                        </div>

                        {/* Total Applications */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col">
                            <div className="flex justify-between">
                                <h4 className="text-base sm:text-lg font-medium text-gray-700">Total Applications</h4>
                                <FiEye className="text-gray-500 text-xl sm:text-2xl" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">{analyticsData.totalApplications.toLocaleString()}</h2>
                        </div>

                        {/* Total Reports */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col">
                            <div className="flex justify-between">
                                <h4 className="text-base sm:text-lg font-medium text-gray-700">Total Reports</h4>
                                <FiBarChart2 className="text-gray-500 text-xl sm:text-2xl" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">{analyticsData.totalReports.toLocaleString()}</h2>
                        </div>
                    </div>

                    {/* Audience Report */}
                    <div className="bg-white p-3 sm:p-6 rounded-lg shadow mt-6">
                        <div className="flex justify-between">
                            <h4 className="text-md sm:text-lg font-medium text-gray-700">User Age Distribution</h4>
                            <button className="px-3 sm:px-4 py-1 sm:py-2 bg-orange-600 text-white text-sm rounded-lg ">
                                Export
                            </button>
                        </div>
                        <div className="h-50 mt-2">
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
                        <div className="bg-emerald-400 h-50 p-4 sm:p-6 rounded-lg shadow text-white flex flex-col justify-center">
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

                        <div className="bg-orange-400 h-60 p-4 sm:p-6 rounded-lg shadow text-white flex flex-col justify-center">
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

                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                        <h4 className="text-base sm:text-lg font-medium text-gray-700">Users Per Gender</h4>
                        <button className="mt-2 bg-purple-200 rounded-md font-semibold px-3 sm:px-5 py-1 sm:py-2 text-sm">
                            View All
                        </button>

                        {/* Chart Container */}
                        <div className="relative h-48 sm:h-64 flex items-center justify-center mt-4">
                            <Doughnut data={doughnutData} options={doughnutOptions} />

                            {/* Total Count in the Center */}
                            <div className="absolute text-center">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                                    {analyticsData.users}
                                </h2>
                                <p className="text-gray-500 text-sm">Gender Distributions</p>
                            </div>
                        </div>

                        {/* Display Gender Percentage */}
                        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                            {Object.entries(analyticsData.usersPerGender).map(([gender, count]) => {
                                const percentage = ((count / analyticsData.users) * 100).toFixed(2);
                                return (
                                    <div key={gender} className="flex items-center space-x-2">
                                        <span className="text-gray-700 font-medium">
                                            {gender.charAt(0).toUpperCase() + gender.slice(1)}:
                                        </span>
                                        <span className="text-green-600 font-bold text-sm">{percentage}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                </div>
            </div>
            <div>

                {/* Tabs */}
                <div className="flex mt-8">
                    {["Recent Users", "Recent Reports", "Recent Applications"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 cursor-pointer text-md font-medium ${activeTab === tab ? "text-orange-600 border-b-3 border-orange-600" : "text-gray-500"
                                }`}>
                            {tab}
                        </button>
                    ))}
                </div>
                {/* Table Section */}
                {activeTab === "Recent Users" && <DashboardCard />}
                {activeTab === "Recent Reports" && <RecentReportsCard />}
                {activeTab === "Recent Applications" && <RecentApplicationsCard />}



            </div>

        </div>
    );
};

export default Dashboard;