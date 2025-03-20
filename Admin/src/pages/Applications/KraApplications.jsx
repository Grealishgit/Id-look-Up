import { useState } from "react";
import { FaSearch, FaUsers, FaDollarSign, FaChartLine, FaBriefcase } from "react-icons/fa";
import { BsThreeDotsVertical, BsPencil, BsDownload } from "react-icons/bs";
import TableCard from "../../components/TableCard";

const KraApplications = () => {

    const stats = [
        { title: "Total Customers", value: "1,02,890", icon: <FaUsers size={20} />, iconBg: "bg-orange-500", trend: "+40%", trendColor: "text-green-500", graphColor: "stroke-orange-500" },
        { title: "Total Revenue", value: "$56,562", icon: <FaDollarSign size={20} />, iconBg: "bg-blue-500", trend: "+25%", trendColor: "text-green-500", graphColor: "stroke-blue-500" },
        { title: "Conversion Ratio", value: "12.08%", icon: <FaChartLine size={20} />, iconBg: "bg-green-500", trend: "-12%", trendColor: "text-red-500", graphColor: "stroke-green-500" },
        { title: "Total Deals", value: "2,543", icon: <FaBriefcase size={20} />, iconBg: "bg-yellow-500", trend: "+19%", trendColor: "text-green-500", graphColor: "stroke-yellow-500" },
    ];

    return (
        <div className="mt-20  px-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 mb-6">
                <h1 className="text-2xl text-orange-500 font-semibold mb-4 md:mb-0">KRA Applications</h1>
                <p className="text-md font-bold text-gray-500">
                    Dashboard &raquo; <span className="text-green-500 underline cursor-pointer">KRA</span>
                </p>
            </div>
            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow flex flex-col">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${stat.iconBg}`}>
                            {stat.icon}
                        </div>
                        <h4 className="text-gray-500 text-sm mt-2">{stat.title}</h4>
                        <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
                        <svg className="w-full h-8 mt-2" viewBox="0 0 100 20">
                            <path d="M0,10 Q20,5 40,10 T80,10" className={`fill-none ${stat.graphColor}`} strokeWidth="2" />
                        </svg>
                        <div className="flex justify-between items-center mt-3">
                            <a href="#" className="text-blue-500 text-sm font-medium">
                                View All →
                            </a>
                            <p className={`text-sm font-semibold ${stat.trendColor}`}>{stat.trend}</p>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">this month</p>
                    </div>
                ))}
            </div>

            {/* Table Section */}
            <TableCard />
        </div>
    );
};

export default KraApplications;
