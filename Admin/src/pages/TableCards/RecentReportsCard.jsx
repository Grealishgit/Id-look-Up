import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical, BsPencil, BsDownload } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";

const RecentReportsCard = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [reports, setReports] = useState([]);
    const { isDarkMode } = useOutletContext();

    const locationColors = {
        Nairobi: "bg-green-200 text-blue-600",
        Mombasa: "bg-orange-200 text-orange-600",
        Kisumu: "bg-red-200 text-red-600",
        Nakuru: "bg-green-200 text-green-600",
        Eldoret: "bg-purple-200 text-purple-600",
        Other: "bg-gray-200 text-gray-600",
    };

    // Fetch Reports from Backend
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("http://localhost:4000/reports");
                const { lostIdReports, lostPassportReports } = response.data.data;

                // Format data for table display
                const formattedReports = [
                    ...lostIdReports.map((report) => ({
                        id: report._id,
                        abstract: report.abstractNumber,
                        name: `${report.fname} ${report.lname}`,
                        idNumber: report.idNumber,
                        type: "ID", // Lost ID
                        email: report.email,
                        location: report.lostCounty || "Other",
                        date: new Date(report.createdAt).toLocaleDateString(),
                        avatar: report.image || "https://i.pravatar.cc/40",
                    })),
                    ...lostPassportReports.map((report) => ({
                        id: report._id,
                        name: `${report.fname} ${report.lname}`,
                        abstract: report.abstractNumber,
                        idNumber: report.passportNumber,
                        type: "Passport", // Lost Passport
                        email: report.email,
                        location: report.lostCounty || "Other",
                        date: new Date(report.createdAt).toLocaleDateString(),
                        avatar: report.image || "https://i.pravatar.cc/40",
                    })),
                ];

                setReports(formattedReports);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
        );
    };

    return (
        <div className="px-1">
            {/* Table Section */}
            <div className={`p-4 
                ${isDarkMode ? "bg-gray-600" : "bg-white "} rounded-lg mt-6 shadow`}>
                <div className="flex flex-wrap justify-between items-center mb-4 space-y-3 sm:space-y-0">
                    <h2 className="text-lg font-semibold ">Recent Reports</h2>
                    <div className="flex flex-wrap space-x-3 items-center">
                        {/* Search Input */}
                        <div className="relative md:mb-0 mb-2 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search Here"
                                className="border w-full sm:w-auto rounded-lg pl-10 pr-4 py-2  focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                            <FaSearch className="absolute left-3 top-3 " />
                        </div>
                        {/* Sort Button */}
                        <button className="bg-orange-600 text-white cursor-pointer px-4 py-2 rounded-lg flex items-center">
                            Sort By <BsThreeDotsVertical className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* Responsive Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-max">
                        <thead>
                            <tr className=" text-left">
                                <th className="p-3">{/* <input type="checkbox" className="cursor-pointer" /> */}</th>
                                <th className="p-3">Names</th>
                                <th className="p-3">Abstract Number</th>
                                <th className="p-3">ID/Passport Number</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Lost County</th>
                                <th className="p-3">Report Date</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.length > 0 ? (
                                reports.map((item) => (
                                    <tr key={item.id} className="border-t text-sm">
                                        <td className="p-3">
                                            <input
                                                className="cursor-pointer"
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => handleSelectRow(item.id)}
                                            />
                                        </td>
                                        <td className="p-3 flex items-center space-x-2">
                                            <img src={item.avatar} alt={item.name} className="h-8 w-8 rounded-full" />
                                            <span>{item.name}</span>
                                        </td>
                                        <td className="p-3">{item.abstract}</td>
                                        <td className="p-3">{item.idNumber}</td>
                                        <td className="p-3">{item.type}</td>
                                        <td className="p-3">{item.email}</td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${locationColors[item.location] || "bg-gray-200 text-gray-600"}`}>
                                                {item.location}
                                            </span>
                                        </td>
                                        <td className="p-3">{item.date}</td>
                                        <td className="p-3 flex space-x-2">
                                            <button className="text-teal-500 cursor-pointer"><BsDownload size={16} /></button>
                                            <button className="text-orange-500 cursor-pointer"><BsPencil size={16} /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center p-3 text-gray-500">
                                        No reports found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap justify-between items-center mt-4 space-y-3 sm:space-y-0">
                    <span className="text-sm">Showing {reports.length} Entries</span>
                    <div className="flex space-x-2">
                        <button className=" px-3 py-1 cursor-pointer border rounded-lg">Prev</button>
                        <span className="px-3 py-1 bg-orange-600  rounded-lg">1</span>
                        <button className=" px-3 py-1 cursor-pointer border rounded-lg">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentReportsCard;
