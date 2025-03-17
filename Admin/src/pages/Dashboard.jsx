import React from "react";
import { FiUser, FiEye, FiBarChart2 } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { Doughnut, Line } from "react-chartjs-2";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


// Sample Data for Doughnut Chart
const doughnutData = {
    labels: ["Mobile", "Desktop", "Tablet"],
    datasets: [
        {
            data: [50, 30, 20], // Adjust with actual values
            backgroundColor: ["#4A90E2", "#50E3C2", "#F5A623"],
            hoverBackgroundColor: ["#357ABD", "#3CB371", "#D48F0C"],
            borderWidth: 2,
        },
    ],
};

const doughnutOptions = {
    cutout: "80%", // This makes it a ring (donut) instead of a full pie
    plugins: {
        legend: {
            display: false, // Hide default legend
        },
    },
};

const Dashboard = () => {
    // Dummy Data
    const analyticsData = {
        totalUsers: 9789,
        totalApplications: 12240,
        totalReports: 4136,
        bounceRate: 77.3,
        impressions: 9903,
        clicks: 16789,
        sessions: 4136,
        sessionByDevice: {
            mobile: 68.3,
            tablet: 17.68,
            desktop: 10.5,
            others: 5.16,
        },
    };




    const visitorsData = [
        { id: 1, channel: "Organic Search", sessions: 782, bounceRate: "32.09%", duration: "0 hrs : 0 mins : 32 secs", goal: 278, pagesPerSession: 2.9, color: "bg-purple-200 text-purple-800" },
        { id: 2, channel: "Direct", sessions: 882, bounceRate: "39.38%", duration: "0 hrs : 2 mins : 45 secs", goal: 782, pagesPerSession: 1.5, color: "bg-blue-200 text-blue-800" },
        { id: 3, channel: "Referral", sessions: 322, bounceRate: "22.67%", duration: "0 hrs : 38 mins : 28 secs", goal: 622, pagesPerSession: 3.2, color: "bg-green-200 text-green-800" },
        { id: 4, channel: "Social", sessions: 389, bounceRate: "25.11%", duration: "0 hrs : 12 mins : 89 secs", goal: 142, pagesPerSession: 1.4, color: "bg-indigo-200 text-indigo-800" },
        { id: 5, channel: "Email", sessions: 378, bounceRate: "23.79%", duration: "0 hrs : 14 mins : 27 secs", goal: 178, pagesPerSession: 1.6, color: "bg-yellow-200 text-yellow-800" },
        { id: 6, channel: "Paid Search", sessions: 488, bounceRate: "28.77%", duration: "0 hrs : 16 mins : 28 secs", goal: 578, pagesPerSession: 2.5, color: "bg-red-200 text-red-800" },
    ];

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
                                <h4 className="text-base sm:text-lg font-medium text-gray-700">Total Users</h4>
                                <FiUser className="text-gray-500 text-xl sm:text-2xl" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">{analyticsData.totalUsers.toLocaleString()}</h2>
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
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow mt-6">
                        <div className="flex justify-between">
                            <h4 className="text-base sm:text-lg font-medium text-gray-700">Audience Report</h4>
                            <button className="px-3 sm:px-4 py-1 sm:py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-purple-700 transition duration-200">
                                Export
                            </button>
                        </div>
                        <div className="h-48 flex items-center justify-center mt-4">
                            <BsGraphUp className="text-gray-400 text-4xl sm:text-6xl" />
                        </div>
                    </div>



                </div>

                {/* Right Section (Plan Expiring & Sessions By Device) */}
                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Plan Expiring */}
                    <div className="flex flex-col  gap-4 sm:gap-6">
                        <div className="bg-orange-400 h-50 p-4 sm:p-6 rounded-lg shadow text-white flex flex-col justify-center">
                            <h4 className="text-base sm:text-lg font-medium">Plan is expiring!</h4>
                            <p className="mt-2 text-sm">Upgrade to premium</p>
                            <button className="mt-4 bg-white text-orange-600 px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-gray-100 transition duration-200">
                                Upgrade Now
                            </button>
                        </div>

                        <div className="bg-orange-400 h-60 p-4 sm:p-6 rounded-lg shadow text-white flex flex-col justify-center">
                            <h4 className="text-base sm:text-lg font-medium">Plan is expiring!</h4>
                            <p className="mt-2 text-sm">Upgrade to premium</p>
                            <button className="mt-4 bg-white text-orange-600 px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-gray-100 transition duration-200">
                                Upgrade Now
                            </button>
                        </div>
                    </div>

                    {/* Sessions By Device */}

                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                        <h4 className="text-base sm:text-lg font-medium text-gray-700">Sessions By Device</h4>
                        <button className="mt-2 bg-purple-200 rounded-md font-semibold px-3 sm:px-5 py-1 sm:py-2 text-sm">
                            View All
                        </button>

                        {/* Chart Container */}
                        <div className="relative h-48 sm:h-64 flex items-center justify-center mt-4">
                            <Doughnut data={doughnutData} options={doughnutOptions} />

                            {/* Total Count in the Center */}
                            <div className="absolute text-center">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                                    {analyticsData.sessions}
                                </h2>
                                <p className="text-gray-500 text-sm">Total Sessions</p>
                            </div>
                        </div>

                        {/* Mapping through sessionByDevice */}
                        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                            {Object.entries(analyticsData.sessionByDevice).map(([device, percentage]) => (
                                <div key={device} className="flex items-center space-x-2">
                                    <span className="text-gray-700 font-medium">
                                        {device.charAt(0).toUpperCase() + device.slice(1)}:
                                    </span>
                                    <span className="text-green-600 font-bold text-sm">{percentage}%</span>
                                </div>
                            ))}
                        </div>

                    </div>


                </div>
            </div>
            <div className="p-6 bg-white mt-6 rounded-lg shadow">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-700 text-center sm:text-left">
                        Visitors By Channel Report
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                        <div className="relative w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search Here"
                                className="w-full sm:w-64 border rounded-lg pl-10 pr-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center w-full sm:w-auto justify-center">
                            Sort By <BsThreeDotsVertical className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-max">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-left">
                                <th className="p-3 text-sm sm:text-base">S.No</th>
                                <th className="p-3 text-sm sm:text-base">Channel</th>
                                <th className="p-3 text-sm sm:text-base">Sessions</th>
                                <th className="p-3 text-sm sm:text-base">Bounce Rate</th>
                                <th className="p-3 text-sm sm:text-base hidden md:table-cell">
                                    Avg Session Duration
                                </th>
                                <th className="p-3 text-sm sm:text-base hidden md:table-cell">
                                    Goal Completed
                                </th>
                                <th className="p-3 text-sm sm:text-base hidden lg:table-cell">
                                    Pages Per Session
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitorsData.map((item) => (
                                <tr key={item.id} className="border-t text-sm">
                                    <td className="p-3">{item.id}</td>
                                    <td className="p-3 flex items-center space-x-2">
                                        <span className="h-5 w-5 bg-gray-200 rounded-full"></span>
                                        <span>{item.channel}</span>
                                    </td>
                                    <td className="p-3">{item.sessions}</td>
                                    <td className="p-3">{item.bounceRate}</td>
                                    <td className="p-3 hidden md:table-cell">{item.duration}</td>
                                    <td className="p-3 hidden md:table-cell">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.color}`}>
                                            {item.goal}
                                        </span>
                                    </td>
                                    <td className="p-3 hidden lg:table-cell">{item.pagesPerSession}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-3 sm:space-y-0">
                    <span className="text-gray-600 text-sm sm:text-base">Showing 6 Entries</span>
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-600 px-3 py-1 border rounded-lg">Prev</button>
                        <span className="px-3 py-1 bg-orange-600 text-white rounded-lg">1</span>
                        <button className="text-gray-600 px-3 py-1 border rounded-lg">2</button>
                        <button className="text-gray-600 px-3 py-1 border rounded-lg">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;