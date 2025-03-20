import React from "react";
import TableCard from "../../components/TableCard";

const LostDL = () => {
    return (
        <div className="p-6 mt-15 bg-gray-200 min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 mb-6">
                <h1 className="text-2xl text-orange-500 font-semibold mb-4 md:mb-0">Lost Driving License</h1>
                <p className="text-md font-bold text-gray-500">
                    Dashboard &raquo; <span className="text-green-500 underline cursor-pointer">Lost Driving license</span>
                </p>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Cards */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Card 1 */}
                    <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm text-gray-500">Total Employees</h2>
                            <p className="text-xl font-bold">22,124</p>
                        </div>
                        <span className="text-green-500 text-sm">+1.03%</span>
                    </div>
                    {/* Card 2 */}
                    <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm text-gray-500">Employees on Leave</h2>
                            <p className="text-xl font-bold">528</p>
                        </div>
                        <span className="text-green-500 text-sm">+0.36%</span>
                    </div>
                    {/* Card 3 */}
                    <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm text-gray-500">Total Clients</h2>
                            <p className="text-xl font-bold">8,289</p>
                        </div>
                        <span className="text-red-500 text-sm">-1.28%</span>
                    </div>
                    {/* Card 4 */}
                    <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-sm text-gray-500">New Leads</h2>
                            <p className="text-xl font-bold">1,453</p>
                        </div>
                        <span className="text-green-500 text-sm">+4.25%</span>
                    </div>
                </div>

                {/* Right Side: Graph */}
                <div className="lg:col-span-9 bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-3">Performance By Category</h2>
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        {/* Placeholder for Chart */}
                        <span className="text-gray-400">[Chart Goes Here]</span>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 mt-8 lg:grid-cols-3 gap-6">
                {/* Jobs Summary (Left) */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-3">Jobs Summary</h2>
                    <div className="flex justify-center">
                        {/* Placeholder for Donut Chart */}
                        <div className="w-40 h-40 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-purple-600">3243</span>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <p><span className="text-purple-500 font-bold">●</span> Published: 1,624</p>
                        <p><span className="text-gray-500 font-bold">●</span> Private: 1,267</p>
                        <p><span className="text-blue-500 font-bold">●</span> Closed: 1,153</p>
                        <p><span className="text-yellow-500 font-bold">●</span> On Hold: 1,153</p>
                    </div>
                </div>

                {/* Upcoming Events (Middle) */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
                    <ul className="space-y-4 text-sm text-gray-700">
                        {[
                            { date: "02", day: "Mon", title: "You have an announcement", type: "Announcement", time: "10:00AM" },
                            { date: "15", day: "Sun", title: "National Holiday", type: "Holiday", time: "" },
                            { date: "23", day: "Mon", title: "John pup birthday", type: "Birthday", time: "" },
                            { date: "30", day: "Fri", title: "Meeting with team", type: "Meeting", time: "02:00PM" },
                        ].map((event, index) => (
                            <li key={index} className="flex items-center">
                                <div className="w-10 h-10 flex flex-col items-center justify-center bg-purple-100 rounded-lg">
                                    <span className="text-lg font-bold text-purple-600">{event.date}</span>
                                    <span className="text-xs text-gray-500">{event.day}</span>
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold">{event.title}</p>
                                    {event.time && <p className="text-xs text-gray-500">{event.time}</p>}
                                    <span className={`px-2 py-1 text-xs rounded ${event.type === "Announcement" ? "bg-blue-200" : event.type === "Holiday" ? "bg-yellow-200" : "bg-green-200"}`}>
                                        {event.type}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Clients (Right) */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-3">Clients</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-gray-700">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left">Client</th>
                                    <th className="text-left">Mail</th>
                                    <th className="text-left">Status</th>
                                    <th className="text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "Diana Aise", email: "diana.1116@demo.com", status: "Active" },
                                    { name: "Rose Mary", email: "rose.756@demo.com", status: "Active" },
                                    { name: "Gretchen Iox", email: "gretchen.1.25@demo.com", status: "Inactive" },
                                    { name: "Gray Noal", email: "gray12gray@demo.com", status: "Active" },
                                ].map((client, index) => (
                                    <tr key={index} className="border-b">
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td className={client.status === "Active" ? "text-green-500" : "text-red-500"}>{client.status}</td>
                                        <td className="space-y-1.5 gap-2">
                                            <button className="px-2 py-1 text-xs bg-purple-500 text-white rounded">Edit</button>
                                            <button className="px-2 py-1 text-xs bg-red-500 text-white rounded ml-2">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <TableCard />
        </div>
    );
};

export default LostDL;