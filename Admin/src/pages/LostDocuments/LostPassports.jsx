import React, { useState } from "react";

const LostPassports = () => {
    const [activeTab, setActiveTab] = useState("Local");

    return (
        <div className="p-6 mt-15  min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center text-gray-700 mb-6">
                <h1 className="text-2xl text-orange-500 font-semibold">Lost Passports</h1>
                <p className="text-md font-bold text-gray-500">
                    Dashboard &raquo; <span className="text-green-500 underline cursor-pointer">Lost Passports</span>
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6">
                {["Local", "International"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 text-sm mb-5 font-medium ${activeTab === tab ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-500"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section - Graph & Stats */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Total Reports</h2>
                    {/* Stats */}
                    <div className="flex flex-wrap justify-between text-gray-600 text-sm mb-4">
                        <div>
                            <p className="font-semibold">$1,290.94 <span className="text-green-500">▲1.22%</span></p>
                            <p>Local Passport Reports</p>
                        </div>
                        <div>
                            <p className="font-semibold">$25,458.20 <span className="text-green-500">▲10.14%</span></p>
                            <p>International Passport Reports</p>
                        </div>
                        <div>
                            <p className="font-semibold">$112.09 <span className="text-green-500">▲0.21%</span></p>
                            <p>Today Change</p>
                        </div>
                    </div>

                    {/* Graph Placeholder */}
                    <div className="bg-gray-100 h-52 rounded-lg flex items-center justify-center text-gray-400">
                        [Graph Placeholder]
                    </div>

                    {/* Time Filter */}
                    <div className="flex justify-end space-x-2 mt-4">
                        {["1D", "1W", "1M", "3M", "6M", "1Y"].map((period) => (
                            <button key={period} className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded">
                                {period}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Section - My Stocks */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Locations Lost</h2>
                        <input
                            type="text"
                            placeholder="Search By County"
                            className="border rounded-lg px-3 py-1 text-sm outline-none"
                        />
                    </div>

                    {/* Stocks List */}
                    <ul className="space-y-3 text-gray-700 text-sm">
                        {[
                            { name: "Github", value: "$12,390.02", change: "+0.14%" },
                            { name: "Twitter", value: "$15,526.01", change: "+2.14%" },
                            { name: "Bootstrap", value: "$30,500.15", change: "-2.73%" },
                            { name: "Microsoft", value: "$180,520.02", change: "+8.63%" },
                            { name: "Apple", value: "$21,093.20", change: "-4.10%" },
                            { name: "Bitcoin", value: "$14,245.23", change: "+0.79%" },
                            { name: "Worldcoin", value: "$107,245.23", change: "+0.79%" },
                            { name: "Humancoin", value: "$4,245.23", change: "+0.79%" },
                        ].map((stock, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{stock.name}</span>
                                <span className={`font-semibold ${stock.change.includes("-") ? "text-red-500" : "text-green-500"}`}>
                                    {stock.value} {stock.change}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Trending Stocks Section */}
            <h2 className="text-lg font-semibold text-gray-700 mt-6">International Countries Reports</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {[
                    { name: "Apple", value: "$12,289.44", change: "+0.14%", profit: "$1,780.80" },
                    { name: "Bitcoin", value: "$58,151.02", change: "+2.14%", profit: "$5,745.62" },
                    { name: "Tesla", value: "$14,452.36", change: "+4.02%", profit: "$4,125.63" },
                    { name: "Amazon", value: "$63,251.11", change: "+5.14%", profit: "$936.30" },

                ].map((stock, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
                        <h3 className="font-semibold">{stock.name}</h3>
                        <p className="text-gray-500 text-sm">{stock.value}</p>
                        <p className={`text-sm font-semibold ${stock.change.includes("-") ? "text-red-500" : "text-green-500"}`}>
                            {stock.change} {stock.profit}
                        </p>
                        <div className="flex mt-3 space-x-2">
                            <button className="px-4 py-1 bg-gray-200 text-gray-700 rounded">Short</button>
                            <button className="px-4 py-1 bg-purple-600 text-white rounded">Buy</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transaction History & Market Movers */}
            <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-6">
                {/* Transaction History */}
                <div className="bg-white rounded-lg shadow p-4 h-70 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-3">Monthly History</h2>
                    <table className="w-full text-sm text-gray-700">
                        <thead>
                            <tr className="text-left  border-b">
                                <th>Symbol</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Shares</th>
                            </tr>
                        </thead>
                        <tbody>
                            {["EPA:THI", "EPA:SCB", "EPA:CGIO", "EPA:NTIX", "EPA:MOD"].map((symbol, index) => (
                                <tr key={index} className="border-b py-4">
                                    <td className="py-3">{symbol}</td>
                                    <td className="py-3">12-06-2023</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 text-xs rounded ${index % 2 === 0 ? "bg-purple-200" : "bg-yellow-200"}`}>
                                            {index % 2 === 0 ? "Buy" : "Sell"}
                                        </span>
                                    </td>
                                    <td className="py-3 text-red-500">${(Math.random() * 3000).toFixed(2)}</td>
                                    <td className="py-3 text-green-500">{index % 2 === 0 ? "+20" : "-15"}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* Market Movers */}
                <div className="bg-white rounded-lg shadow p-4 h-70 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-3">Overall History</h2>
                    <table className="w-full text-sm text-gray-700">
                        <thead>
                            <tr className="text-left border-b">
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>1D Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {["APPL", "TTR", "BS", "NFLX", "ION"].map((symbol, index) => (
                                <tr key={index} className="border-b ">
                                    <td className="py-3">{symbol}</td>
                                    <td className="py-3">{symbol === "APPL" ? "Apple Inc." : "Company"}</td>
                                    <td className="py-3">${(Math.random() * 1000).toFixed(2)}</td>
                                    <td className={index % 2 === 0 ? "text-green-500" : "text-red-500"}>
                                        {index % 2 === 0
                                            ? `+${(Math.random() * 20).toFixed(2)}`
                                            : `-${(Math.random() * 20).toFixed(2)}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>




        </div>
    );
};

export default LostPassports;
