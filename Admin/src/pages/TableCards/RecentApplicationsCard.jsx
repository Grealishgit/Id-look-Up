import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical, BsPencil, BsDownload } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";

const RecentApplicationsCard = () => {
    const [applications, setApplications] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isDarkMode } = useOutletContext();


    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch("http://localhost:4000/applications");
                const result = await response.json();

                if (result.success) {
                    // Combine lostIdApplications and formUploads into one array
                    const idApplications = [...result.data.lostIdApplications];
                    setApplications(idApplications);
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
                    <h2 className="text-lg font-semibold ">Recent Applications</h2>
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
                        <button className="bg-orange-600  px-4 py-2 rounded-lg flex items-center">
                            Sort By <BsThreeDotsVertical className="ml-2 cursor-pointer" />
                        </button>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="text-center text-gray-600">Loading applications...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : applications.length === 0 ? (
                        <p className="text-center text-gray-600">No applications found.</p>
                    ) : (
                        <table className="w-full border-collapse min-w-max">
                            <thead>
                                            <tr className=" text-left">
                                    <th className="p-3">{/* <input type="checkbox" /> */}</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">ID Number</th>
                                    <th className="p-3">DOB</th>
                                    <th className="p-3">County</th>
                                    <th className="p-3">Sub-County</th>
                                    <th className="p-3">Report Date</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((item, index) => (
                                    <tr key={index} className="border-t text-sm">
                                        <td className="p-3">
                                            <input
                                                className="cursor-pointer"
                                                type="checkbox"
                                                checked={selectedRows.includes(item._id)}
                                                onChange={() => handleSelectRow(item._id)}
                                            />
                                        </td>
                                        <td className="p-3 flex items-center space-x-2">
                                            <img
                                                src={`https://i.pravatar.cc/40?u=${item._id}`}
                                                alt={item.fname}
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <span>{item.fname} {item.lname}</span>
                                        </td>
                                        <td className="p-3">{item.idNo}</td>
                                        <td className="p-3">{item.dob ? new Date(item.dob).toLocaleDateString() : "N/A"}</td>
                                        <td className="p-3">{item.County}</td>
                                        <td className="p-3">{item.SubCounty}</td>
                                        <td className="p-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="p-3 flex space-x-2">
                                            <button className="text-teal-500"><BsDownload size={16} /></button>
                                            <button className="text-orange-500"><BsPencil size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {/* Pagination */}
                <div className="flex flex-wrap justify-between items-center mt-4 space-y-3 sm:space-y-0">
                    <span className=" text-sm">Showing {applications.length} Entries</span>
                    <div className="flex space-x-2">
                        <button className="px-3 cursor-pointer py-1 border rounded-lg">Prev</button>
                        <span className="px-3 py-1 bg-orange-600  rounded-lg">1</span>
                        <button className=" px-3 cursor-pointer py-1 border rounded-lg">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentApplicationsCard;
