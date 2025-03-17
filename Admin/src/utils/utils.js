import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BsThreeDotsVertical } from "react-icons/bs";

const data = [
    { month: "Jan", newUsers: 30, sessions: 50, avgDuration: 40 },
    { month: "Feb", newUsers: 50, sessions: 45, avgDuration: 35 },
    { month: "Mar", newUsers: 40, sessions: 60, avgDuration: 50 },
    { month: "Apr", newUsers: 60, sessions: 55, avgDuration: 45 },
    { month: "May", newUsers: 35, sessions: 70, avgDuration: 55 },
    { month: "Jun", newUsers: 80, sessions: 65, avgDuration: 40 },
    { month: "Jul", newUsers: 90, sessions: 60, avgDuration: 50 },
    { month: "Aug", newUsers: 70, sessions: 75, avgDuration: 30 },
    { month: "Sep", newUsers: 60, sessions: 80, avgDuration: 45 },
    { month: "Oct", newUsers: 50, sessions: 70, avgDuration: 35 },
    { month: "Nov", newUsers: 95, sessions: 85, avgDuration: 60 },
    { month: "Dec", newUsers: 100, sessions: 95, avgDuration: 70 },
];

const SessionsChart = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Sessions Duration By New Users</h2>
                <button className="text-gray-500 flex items-center">View All <BsThreeDotsVertical className="ml-2" /></button>
            </div>

            {/* Chart Section */}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="newUsers" stroke="#7B61FF" strokeWidth={2} dot={{ r: 4 }} name="New Users" />
                    <Line type="monotone" dataKey="sessions" stroke="#17A2B8" strokeWidth={2} dot={{ r: 4 }} name="Sessions" />
                    <Line type="monotone" dataKey="avgDuration" stroke="#F4A261" strokeWidth={2} dot={{ r: 4 }} name="Avg Session Duration" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SessionsChart;
