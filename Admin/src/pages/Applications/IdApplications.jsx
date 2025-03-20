import React from 'react';
import TableCard from '../../components/TableCard';

const IdApplications = () => {
    return (
        <div className="p-6 mt-20 bg-gray-100 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 mb-6">
                <h1 className="text-2xl text-orange-500 font-semibold mb-4 md:mb-0">ID Applications</h1>
                <p className="text-md font-bold text-gray-500">
                    Dashboard &raquo; <span className="text-green-500 underline cursor-pointer">ID Applications</span>
                </p>
            </div>
            {/* Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Stats Section */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                    {[
                        { title: "Completed Projects", value: 109, percentage: "+1.5%", color: "text-green-500", bg: "bg-purple-100" },
                        { title: "Overdue Projects", value: 18, percentage: "-0.23%", color: "text-red-500", bg: "bg-red-100" },
                        { title: "Total Projects", value: 389, percentage: "+0.67%", color: "text-green-500", bg: "bg-green-100" },
                        { title: "Pending Projects", value: 227, percentage: "+0.53%", color: "text-green-500", bg: "bg-yellow-100" },
                    ].map((stat, index) => (
                        <div key={index} className={`p-4 rounded-lg shadow-md ${stat.bg}`}>
                            <h3 className="text-sm font-semibold">{stat.title}</h3>
                            <p className="text-xl font-bold mt-1">{stat.value}</p>
                            <span className={`text-sm ${stat.color}`}>{stat.percentage} this month</span>
                        </div>
                    ))}
                </div>

                {/* Team Members */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-3">Team Members</h2>
                    {[
                        { name: "Melissa Smith", role: "UI Developer" },
                        { name: "Jason Momoa", role: "React Developer" },
                        { name: "Kamala Hars", role: "Testing" },
                        { name: "Diego Sanch", role: "Angular Developer" },
                        { name: "Jake Sully", role: "Web Designer" },
                    ].map((member, index) => (
                        <div key={index} className="flex justify-between py-2 border-b last:border-none">
                            <span>{member.name}</span>
                            <span className="text-gray-500 text-sm">{member.role}</span>
                        </div>
                    ))}
                </div>

                {/* Daily Tasks */}
                <div className="bg-white p-4 rounded-lg shadow-md">
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
                                    <span key={i} className="text-xs px-2 py-1 bg-gray-200 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
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
                                    <span key={i} className="text-xs px-2 py-1 bg-gray-200 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Project Analysis */}
                <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-3">Project Analysis</h2>
                    <p className="text-sm text-gray-500">Graph Component Placeholder</p>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white p-4 rounded-lg shadow-md">
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
                                <p className="text-xs text-gray-500">{transaction.date}</p>
                            </div>
                            <span className="font-semibold">{transaction.amount}</span>
                        </div>
                    ))}
                </div>

            </div>
            <TableCard />
        </div>
    );
};

export default IdApplications;
