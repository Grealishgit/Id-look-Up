import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical, BsPencil, BsDownload } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";

const RecentUserCard = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);
    const [countyColors, setCountyColors] = useState({});
    const { isDarkMode } = useOutletContext();

    const colors = [
        "bg-blue-200 text-blue-600",
        "bg-orange-200 text-orange-600",
        "bg-red-200 text-red-600",
        "bg-green-200 text-green-600",
        "bg-purple-200 text-purple-600",
        "bg-yellow-200 text-yellow-600",
        "bg-pink-200 text-pink-600",
        "bg-gray-200 text-gray-600",
    ];

    // Function to assign random colors to each county
    const assignRandomColors = (users) => {
        const countyColorMap = {};
        users.forEach((user) => {
            if (!countyColorMap[user.homeCounty]) {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                countyColorMap[user.homeCounty] = randomColor;
            }
        });
        setCountyColors(countyColorMap);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/get-all-users");
                setData(response.data.data);
                assignRandomColors(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
        );
    };

    return (
        <div className=" px-1">
            {/* Table Section */}
            <div className={`p-4 
                ${isDarkMode ? "bg-gray-600" : "bg-white "} rounded-lg mt-6 shadow`}>
                <div className="flex flex-wrap justify-between items-center mb-4 space-y-3 sm:space-y-0">
                    <h2 className="text-lg font-semibold ">Recent Users</h2>
                    <div className="flex flex-wrap space-x-3 items-center">
                        {/* Search Input */}
                        <div className="relative md:mb-0 mb-2 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search Here"
                                className="border w-full sm:w-auto rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                            <FaSearch className="absolute left-3 top-3 " />
                        </div>
                        {/* Sort Button */}
                        <button className="bg-orange-600 text-white px-4 cursor-pointer py-2 rounded-lg flex items-center">
                            Sort By <BsThreeDotsVertical className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* Responsive Table */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="text-left">
                                <th className="p-3">{/* <input type="checkbox" /> */}</th>
                                <th className="p-3">Names</th>
                                <th className="p-3">Id Number</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Home County</th>
                                <th className="p-3">Joined On</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <tr key={item._id} className="border-t text-sm">
                                        <td className="p-3">
                                            <input type="checkbox" checked={selectedRows.includes(item._id)} onChange={() => handleSelectRow(item._id)} />
                                        </td>
                                        <td className="p-3 flex items-center space-x-2">
                                            <img src={item.image} alt={item.name} className="h-8 w-8 rounded-full" />
                                            <span>{item.fname} {item.lname}</span>
                                        </td>
                                        <td className="p-3">{item.idNumber}</td>
                                        <td className="p-3">{item.email}</td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-md text-xs font-semibold ${countyColors[item.homeCounty] || ""}`}>
                                                {item.homeCounty}
                                            </span>
                                        </td>
                                        <td className="p-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="p-3 flex space-x-2">
                                            <button className="text-teal-500 cursor-pointer"><BsDownload size={16} /></button>
                                            <button className="text-orange-500 cursor-pointer"><BsPencil size={16} /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                        <td colSpan="7" className="text-center p-3 ">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap justify-between items-center mt-4 space-y-3 sm:space-y-0">
                    <span className="text-sm">Showing {data.length} Entries</span>
                    <div className="flex space-x-2">
                        <button className=" px-3 py-1 border rounded-lg">Prev</button>
                        <span className="px-3 py-1 bg-orange-600  rounded-lg">1</span>
                        <button className=" px-3 py-1 border rounded-lg">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentUserCard;
