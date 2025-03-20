import React from "react";

const LostId = () => {
    return (
        <div className="p-4 mt-15 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center text-gray-700 mb-4">
                <h1 className="text-xl text-orange-500 font-semibold">Lost ID's</h1>
                <p className="text-md font-bold text-gray-500">Dashboard &raquo; <span className="text-green-500 underline cursor-pointer">Lost ID's</span> </p>
            </div>
            {/* Top Categories & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left Section - Top Categories */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Top Categories</h2>
                        <a href="#" className="text-blue-600 text-sm">View All</a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { title: "UI/UX Design", courses: "1000+ Courses", icon: "🟪" },
                            { title: "Digital Marketing", courses: "90+ Courses", icon: "🚀" },
                            { title: "Web Development", courses: "250+ Courses", icon: "🖥️" },
                            { title: "Stocks & Trading", courses: "100+ Courses", icon: "📈" },
                        ].map((category, index) => (
                            <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
                                <div className="text-3xl">{category.icon}</div>
                                <h3 className="font-medium mt-2 text-center">{category.title}</h3>
                                <p className="text-sm text-gray-500 text-center">{category.courses}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section - Stats */}
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { value: "$98,312", label: "YTD Earnings", change: "+2.02%", color: "purple-500" },
                        { value: "35,393", label: "Total Students", change: "-0.24%", color: "blue-500" },
                        { value: "573", label: "Total Instructors", change: "-1.32%", color: "yellow-500" },
                        { value: "2,389", label: "Total Courses", change: "+0.89%", color: "red-500" },
                    ].map((stat, index) => (
                        <div key={index} className={`p-4 bg-white rounded-lg shadow-md border-l-4 border-${stat.color}`}>
                            <h4 className="text-xl font-semibold">{stat.value}</h4>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className={`text-sm font-medium ${stat.change.includes("+") ? "text-green-600" : "text-red-600"}`}>
                                {stat.change}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Earnings Report & My Courses */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {/* Earnings Report - Left */}
                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Earnings Report</h2>
                        <div className="flex space-x-2">
                            {["1M", "6M", "1Y", "All"].map((period) => (
                                <button key={period} className="px-3 py-1 bg-gray-200 rounded-md text-sm">
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Placeholder for Chart (Use Recharts or Chart.js) */}
                    <div className="h-48 bg-gray-50 flex items-center justify-center">
                        <span className="text-gray-400">[ Earnings Chart ]</span>
                    </div>
                </div>

                {/* My Courses - Right */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">My Courses</h2>
                        <a href="#" className="text-blue-600 text-sm">View All</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-gray-500 text-sm">
                                    <th className="py-2">Course Title</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Duration</th>
                                    <th className="py-2">Type</th>
                                    <th className="py-2">Instructor</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { title: "UI/UX Designing", status: "60%", duration: "3 Months", type: "Full Time", instructor: "Sarah Taylor", typeColor: "purple-500" },
                                    { title: "Project Management", status: "100%", duration: "45 Days", type: "Completed", instructor: "Jason Smith", typeColor: "green-500" },
                                    { title: "Python", status: "38%", duration: "90 Days", type: "Part Time", instructor: "Alex Pereira", typeColor: "yellow-500" },
                                    { title: "Digital Marketing", status: "75%", duration: "24 Days", type: "Week End", instructor: "Kamala Singh", typeColor: "blue-500" },
                                    { title: "Full Stack Development", status: "55%", duration: "6 Months", type: "Full Time", instructor: "Jessica Leon", typeColor: "purple-500" },
                                    { title: "Stocks & Trading", status: "29%", duration: "1 Month", type: "Stopped", instructor: "Israel Khan", typeColor: "red-500" },
                                ].map((course, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2">{course.title}</td>
                                        <td className="py-2">{course.status}</td>
                                        <td className="py-2">{course.duration}</td>
                                        <td className={`py-2 text-${course.typeColor} font-medium`}>{course.type}</td>
                                        <td className="py-2">{course.instructor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {/* Top Instructors */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Top Instructors</h2>
                    {[
                        { name: "John Henry", qualification: "M.Tech", classes: "321", subject: "Digital Marketing" },
                        { name: "Mortal Yun", qualification: "P.H.D", classes: "25", subject: "Stocks & Trading" },
                        { name: "Trex Con", qualification: "MBBS", classes: "39", subject: "Science" },
                        { name: "Saiu Sarah", qualification: "P.H.D", classes: "11", subject: "Science" },
                        { name: "Ion Hau", qualification: "M.Tech", classes: "124", subject: "Web Development" },
                    ].map((instructor, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b">
                            <div>
                                <h3 className="font-medium">{instructor.name}</h3>
                                <p className="text-sm text-gray-500">{instructor.qualification}</p>
                            </div>
                            <p className="text-blue-600 text-sm">{instructor.classes} classes</p>
                        </div>
                    ))}
                </div>

                {/* New Students */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">New Students</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 border-b">
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-center">Courses</th>
                                    <th className="py-2 px-4 text-center">Completed</th>
                                    <th className="py-2 px-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "Richard Dom", email: "richardom1116@demo.com", courses: 9, completed: 1 },
                                    { name: "Alicia Keys", email: "aliciakeys98@gmail.com", courses: 1, completed: 0 },
                                    { name: "Robert Brook", email: "robertbrook95@gmail.com", courses: 15, completed: 0 },
                                    { name: "Alex Boi", email: "alexboi555@gmail.com", courses: 16, completed: 3 },
                                ].map((student, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50 transition">
                                        <td className="py-3 px-4 flex items-center space-x-2">
                                            <span className="font-medium">{student.name}</span>
                                            <span className="text-gray-400 text-xs">{student.email}</span>
                                        </td>
                                        <td className="py-3 px-4 text-center">{student.courses}</td>
                                        <td className="py-3 px-4 text-center">{student.completed}</td>
                                        <td className="py-3 px-4 text-center">
                                            <button className="text-red-500 hover:text-red-700 transition">
                                                ❌
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payouts Chart Placeholder */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Payouts</h2>
                    <div className="h-40 flex items-center justify-center text-gray-400">
                        [Payouts Chart Placeholder]
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LostId;