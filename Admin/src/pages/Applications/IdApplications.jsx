import React, { useEffect, useState } from "react";
import axios from "axios";
import RecentApplicationsCard from "../TableCards/RecentApplicationsCard";
import { useOutletContext } from "react-router-dom";


const IdApplications = () => {
    const [analyticsData, setAnalyticsData] = useState({
        totalApplications: 0,
        totalCountyApplications: 0,
        invalidApplications: 0,
        commonCounties: 0,
    });
    const { isDarkMode } = useOutletContext();


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

    // Fetch total counties where applications have been made
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

    // Fetch invalid applications (applications with missing fields)
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

    // Fetch common counties (counties with more than 2 applications)
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

            // Convert to array, sort, and get the top 5 counties
            const sortedCounties = Object.entries(countyCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            // Count how many counties appear more than once
            const commonCounties = Object.values(countyCounts).filter(count => count > 1).length;

            console.log("Common Counties Count:", commonCounties);

            setAnalyticsData((prev) => ({
                ...prev,
                commonCounties,
                highestCounties: sortedCounties,
            }));
        } catch (error) {
            console.error("Error fetching common counties:", error);
        }
    };



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
                        <p className="text-gray-500">No data available</p>
                    )}
                </div>


                {/* Daily Tasks */}
                <div className={` p-4 ${isDarkMode ? "bg-gray-600" : "bg-white"}  rounded-lg shadow-md`}>
                    <h2 className="text-lg font-semibold mb-3">Daily Tasks</h2>
                    {[
                        { task: "Home Page Design", tags: ["Framework", "Angular", "PHP"] },
                        { task: "About Us Page Redesign", tags: ["HTML", "Symphony", "PHP"] },
                        { task: "New Project Discussion", tags: ["React", "Typescript"] },
                    ].map((task, index) => (
                        <div key={index} className="mb-3">
                            <h3 className="text-md font-medium">{task.task}</h3>
                            <div className="flex space-x-2 mt-1">
                                {task.tags.map((tag, i) => (
                                    <span key={i} className={`text-xs px-2 py-1 ${isDarkMode ? "bg-gray-500" : "bg-white"}  rounded-full`}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${isDarkMode ? " bg-gray-600" : "bg-white"}  p-4 rounded-lg shadow-md`}>
                    <h2 className="text-lg font-semibold mb-3">Counties Overview</h2>
                    {[
                        { task: "Top Counties", tags: ["Framework", "Angular", "PHP"] },
                        { task: "About Us Page Redesign", tags: ["HTML", "Symphony", "PHP"] },
                        { task: "New Project Discussion", tags: ["React", "Typescript"] },
                    ].map((task, index) => (
                        <div key={index} className="mb-3">
                            <h3 className="text-md font-medium">{task.task}</h3>
                            <div className="flex space-x-2 mt-1">
                                {task.tags.map((tag, i) => (
                                    <span key={i} className={`text-xs px-2 py-1 ${isDarkMode ? " bg-gray-500" : "bg-white"}  rounded-md`}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Project Analysis */}
                <div className={`lg:col-span-2 ${isDarkMode ? " bg-gray-600" : "bg-white"}   p-4 rounded-lg shadow-md`}>
                    <h2 className="text-lg font-semibold mb-3">Project Analysis</h2>
                    <p className="text-sm ">Graph Component Placeholder</p>
                </div>

                {/* Recent Transactions */}
                <div className={`p-4 ${isDarkMode ? "bg-gray-600" : "bg-white"} rounded-lg shadow-md`}>
                    <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
                    {[
                        { name: "Simon Cowall", amount: "$21,442", date: "Feb 28, 2023" },
                        { name: "Melissa Blue", amount: "$8,789", date: "Mar 28, 2023" },
                        { name: "Gabriel Shin", amount: "$13,677", date: "Mar 16, 2023" },
                        { name: "Yohasimi Nakiyaro", amount: "$3,543", date: "Mar 19, 2023" },
                        { name: "Brenda Lynn", amount: "$7,890", date: "Mar 10, 2023" },
                    ].map((transaction, index) => (
                        <div key={index} className="flex justify-between py-2 border-b last:border-none">
                            <div>
                                <h3 className="text-sm font-medium">{transaction.name}</h3>
                                <p className="text-xs ">{transaction.date}</p>
                            </div>
                            <span className="font-semibold">{transaction.amount}</span>
                        </div>
                    ))}
                </div>

            </div>
            {/* Applications list */}
            < RecentApplicationsCard />
        </div>
    );
};

export default IdApplications;
