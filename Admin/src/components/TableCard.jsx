import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical, BsPencil, BsDownload } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";

const TableCard = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const { isDarkMode } = useOutletContext()
    const data = [
        { id: 1, name: "Mayor Kelly", category: "Manufacture", email: "mayorkelly@gmail.com", location: "Germany", date: "Sep 15 - Oct 12, 2023", avatar: "https://i.pravatar.cc/40?img=1" },
        { id: 2, name: "Andrew Garfield", category: "Development", email: "andrewgarfield@gmail.com", location: "Canada", date: "Apr 10 - Dec 12, 2023", avatar: "https://i.pravatar.cc/40?img=2" },
        { id: 3, name: "Simon Cowel", category: "Service", email: "simoncowel234@gmail.com", location: "Europe", date: "Sep 15 - Oct 12, 2023", avatar: "https://i.pravatar.cc/40?img=3" },
        { id: 4, name: "Mirinda Hers", category: "Marketing", email: "mirindahers@gmail.com", location: "USA", date: "Apr 14 - Dec 14, 2023", avatar: "https://i.pravatar.cc/40?img=4" },
        { id: 5, name: "Jacob Smith", category: "Social Platform", email: "jacobsmith@gmail.com", location: "Singapore", date: "Feb 25 - Nov 25, 2023", avatar: "https://i.pravatar.cc/40?img=5" },
    ];

    const locationColors = {
        Germany: "bg-blue-200 text-blue-600",
        Canada: "bg-orange-200 text-orange-600",
        Europe: "bg-red-200 text-red-600",
        USA: "bg-orange-200 text-orange-600",
        Singapore: "bg-green-200 text-green-600",
    };


    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
        );
    };

    return (
        <div className="mt-20 px-1">

            {/* Table Section */}
            <div className={`p-4  ${isDarkMode ? "text-white bg-gray-500" : "text-black bg-white"} rounded-lg mt-6 shadow`}>
                <div className="flex flex-wrap justify-between items-center mb-4 space-y-3 sm:space-y-0">
                    <h2 className="text-lg font-semibold ">ID Applications</h2>
                    <div className="flex flex-wrap space-x-3 items-center">
                        {/* Search Input */}
                        <div className="relative md:mb-0 mb-2 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search Here"
                                className="border w-full sm:w-auto rounded-lg pl-10 pr-4 py-2  focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <FaSearch className="absolute left-3 top-3 " />
                        </div>
                        {/* Sort Button */}
                        <button className="bg-orange-600  px-4 py-2  rounded-lg flex items-center">
                            Sort By <BsThreeDotsVertical className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* Responsive Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-max">
                        <thead>
                            <tr className=" text-left">
                                <th className="p-3">{/* <input type="checkbox" /> */}</th>
                                <th className="p-3">Sales Rep</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Mail</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} className="border-t text-sm">
                                    <td className="p-3">
                                        <input type="checkbox" checked={selectedRows.includes(item.id)} onChange={() => handleSelectRow(item.id)} />
                                    </td>
                                    <td className="p-3 flex items-center space-x-2">
                                        <img src={item.avatar} alt={item.name} className="h-8 w-8 rounded-full" />
                                        <span>{item.name}</span>
                                    </td>
                                    <td className="p-3">{item.category}</td>
                                    <td className="p-3">{item.email}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${locationColors[item.location]}`}>
                                            {item.location}
                                        </span>
                                    </td>
                                    <td className="p-3">{item.date}</td>
                                    <td className="p-3 flex space-x-2">
                                        <button className="text-teal-500"><BsDownload size={16} /></button>
                                        <button className="text-orange-500"><BsPencil size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap justify-between items-center mt-4 space-y-3 sm:space-y-0">
                    <span className="text-sm">Showing 5 Entries</span>
                    <div className="flex space-x-2">
                        <button className=" px-3 py-1 border rounded-lg">Prev</button>
                        <span className="px-3 py-1 bg-orange-600 text-white rounded-lg">1</span>
                        <button className=" px-3 py-1 border rounded-lg">2</button>
                        <button className="px-3 py-1 border rounded-lg">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableCard;
