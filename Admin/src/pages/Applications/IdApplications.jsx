import React, { useEffect, useState } from "react";
import axios from "axios";
import RecentApplicationsCard from "../TableCards/RecentApplicationsCard";
import { useOutletContext } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const IdApplications = () => {
    const [analyticsData, setAnalyticsData] = useState({
        totalApplications: 0,
        totalCountyApplications: 0,
        invalidApplications: 0,
        commonCounties: 0,
        highestCounties: [],
        leastActiveCounties: [],
        countyApplications: [],
    });
    const { isDarkMode } = useOutletContext();
    const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to generate county applications data
    const generateCountyApplications = (lostIdApplications) => {
        const countyCounts = lostIdApplications.reduce((acc, app) => {
            acc[app.County] = (acc[app.County] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(countyCounts).map(([name, count], index) => ({
            countyNumber: index + 1,
            applicationsCount: count,
        }));
    };

    // Fetch total applications
    const fetchTotalApplications = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/applications`);
            const data = response.data;

            if (!data.success || !data.data || !Array.isArray(data.data.lostIdApplications)) {
                throw new Error("Unexpected API response structure");
            }

            setAnalyticsData((prev) => ({
                ...prev,
                totalApplications: data.data.lostIdApplications.length,
            }));
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    // Fetch total county applications
    const fetchTotalCountyApplications = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/applications`);
            const lostIdApplications = response.data.data.lostIdApplications;

            if (!Array.isArray(lostIdApplications)) {
                throw new Error("Invalid data format for county applications");
            }

            const uniqueCounties = new Set(lostIdApplications.map((app) => app.County));
            setAnalyticsData((prev) => ({
                ...prev,
                totalCountyApplications: uniqueCounties.size,
            }));
        } catch (error) {
            console.error("Error fetching county applications:", error);
        }
    };

    // Fetch invalid applications
    const fetchInvalidApplications = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/applications`);
            const lostIdApplications = response.data.data.lostIdApplications;

            const invalidApplications = lostIdApplications.filter(
                (app) => !app.fname || !app.lname || !app.idNo || !app.County
            ).length;

            setAnalyticsData((prev) => ({
                ...prev,
                invalidApplications,
            }));
        } catch (error) {
            console.error("Error fetching invalid applications:", error);
        }
    };

    // Fetch common counties
    const fetchCommonCounties = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/applications`);
            const lostIdApplications = response.data.data.lostIdApplications;

            // Filter out entries with undefined county
            const validApplications = lostIdApplications.filter(app => app.County);

            // Count occurrences of each county
            const countyCounts = validApplications.reduce((acc, app) => {
                acc[app.County] = (acc[app.County] || 0) + 1;
                return acc;
            }, {});

            // Convert to an array, sort, and get the top 5 counties
            const sortedCounties = Object.entries(countyCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count) // Sort in descending order (highest first)
                .slice(0, 5); // Get top 5 counties

            // Count how many counties appear more than once
            const commonCounties = Object.values(countyCounts).filter(count => count > 1).length;

            // Get the bottom 5 least active counties (lowest applications)
            const leastActiveCounties = Object.entries(countyCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => a.count - b.count) // Sort in ascending order (lowest first)
                .slice(0, 5); // Get bottom 5 counties

            setAnalyticsData((prev) => ({
                ...prev,
                commonCounties,
                highestCounties: sortedCounties,
                leastActiveCounties,
            }));
        } catch (error) {
            console.error("Error fetching common counties:", error);
        }
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/applications`);
                const result = response.data;

                if (result.success) {
                    const lostIdApplications = result.data.lostIdApplications.reverse().slice(0, 5); // Fetch the recent applications

                    setApplications(lostIdApplications); // Set the applications to state

                    // Generate county applications data for the chart
                    const countyApplications = generateCountyApplications(lostIdApplications); // Pass lostIdApplications here
                    setAnalyticsData((prev) => ({
                        ...prev,
                        countyApplications, // Set county applications data
                    }));
                } else {
                    setError("Failed to fetch applications.");
                }
            } catch (err) {
                setError("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    useEffect(() => {
        fetchTotalApplications();
        fetchTotalCountyApplications();
        fetchInvalidApplications();
        fetchCommonCounties();
    }, []);






    return (
        <div className={`p-6 mt-20 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100"}  min-h-screen`}>
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 mb-6">
                <h1 className="text-2xl text-orange-500 font-semibold mb-4 md:mb-0">Lost ID Applications</h1>
                <p className="text-md font-bold "> <a href="/" className={`${isDarkMode ? "text-white" : "text-black"}`}>Dashboard &raquo; </a>
                    <span className="text-green-500 underline cursor-pointer">ID Applications</span>
                </p>
            </div>
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Stats Section */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                    {[

                        { title: "Total Applications", value: analyticsData.totalApplications, percentage: "+1.5%", color: "text-pink-500", bg: "bg-purple-300", dark: "bg-gray-600" },
                        { title: "Total County Applications", value: analyticsData.totalCountyApplications, percentage: "-0.23%", color: "text-red-500", bg: "bg-red-100", dark: "bg-gray-600" },
                        { title: "Invalid Applications", value: analyticsData.invalidApplications, percentage: "+0.67%", color: "text-orange-500", bg: "bg-emerald-200", dark: "bg-gray-600" },
                        { title: "Common Counties", value: analyticsData.commonCounties, percentage: "+0.53%", color: "text-green-500", bg: "bg-yellow-200", dark: "bg-gray-600" },

                    ].map((stat, index) => (
                        <div key={index} className={`p-4 ${isDarkMode ? stat.dark : stat.bg} rounded-lg shadow-md`}>
                            <h3 className="text-sm font-semibold">{stat.title}</h3>
                            <p className="text-xl font-bold mt-1">{stat.value}</p>
                            <span className={` ${stat.color} text-sm`}>
                                {stat.percentage} this month
                            </span>


                        </div>
                    ))}
                </div>

                {/*Highest County Applications */}
                <div className={`p-4 ${isDarkMode ? "bg-gray-600" : "bg-white"} rounded-lg shadow-md`}>
                    <h2 className="text-lg font-semibold mb-3">Highest County Applications</h2>
                    {analyticsData.highestCounties?.length > 0 ? (
                        analyticsData.highestCounties.map((county, index) => (
                            <div key={index} className="flex justify-between py-2 border-b last:border-none">
                                <span>{county.name}</span>
                                <span className="text-sm">{county.count} Applications</span>
                            </div>
                        ))
                    ) : (
                            <p>No data available</p>
                    )}

                </div>


                {/* Chart */}
                <div className={`p-4 ${isDarkMode ? "bg-gray-600" : "bg-white"} flex justify-center items-center rounded-lg shadow-md`}>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold mb-3">Top 5 Counties Overview</h2>
                        {analyticsData.highestCounties.length > 0 ? (
                            <PieChart width={200} height={260}>
                                <Pie
                                    data={analyticsData.highestCounties}
                                    dataKey="count"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    fill="#8884d8"
                                    label
                                >
                                    {analyticsData.highestCounties.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </div>



                <div className={`${isDarkMode ? "bg-gray-600" : "bg-white"} p-4 rounded-lg shadow-md`}>
                    <h2 className="text-lg font-semibold mb-3">Counties Overview</h2>
                    {[
                        { task: "Top Counties", tags: analyticsData.highestCounties.map(county => `${county.name} ${county.count}`) },
                        { task: "Common Counties Count", tags: [`${analyticsData.commonCounties} counties appear more than once`] },
                        { task: "Least Active Counties", tags: analyticsData.leastActiveCounties.map(county => `${county.name}  ${county.count} `) }
                    ].map((item, index) => (
                        <div key={index} className="mb-3 ">
                            <h3 className="text-md font-medium">{item.task}</h3>
                            <div className="flex gap-2 space-x-2 mt-1 flex-wrap">
                                {item.tags.map((tag, i) => (
                                    <span key={i} className={`text-xs px-2 gap-2 py-1 ${isDarkMode ? "bg-gray-500" : "bg-white"} rounded-md`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>



                {/* Project Analysis */}
                <div className={`lg:col-span-2 ${isDarkMode ? " bg-gray-600" : "bg-white"} p-4 rounded-lg shadow-md`}>
                    <h2 className="text-lg font-semibold mb-3">Project Analysis</h2>
                    <p className="text-sm">Graph Component Placeholder</p>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analyticsData.countyApplications}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="countyNumber" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="applicationsCount"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                                dot={false}
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Transactions */}
                <div className={`p-4 ${isDarkMode ? "bg-gray-600" : "bg-white"} rounded-lg shadow-md`}>
                    <h2 className="text-lg font-semibold mb-3">Recent Applications</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : applications.length > 0 ? (
                        applications.map((application, index) => (
                            <div key={index} className="flex justify-between py-2 border-b last:border-none">
                                <div>
                                    <h3 className="text-sm font-medium">{application.fname} {application.lname}</h3>
                                    <p className="text-xs">{application.County}</p> {/* Display county */}
                                </div>
                                <span className="font-semibold">{application.idNo}</span> {/* ID or other relevant data */}
                            </div>
                        ))
                    ) : (
                        <p>No recent applications</p>
                    )}
                </div>


            </div>
            {/* Applications list */}
            < RecentApplicationsCard />
        </div>
    );
};

export default IdApplications;
