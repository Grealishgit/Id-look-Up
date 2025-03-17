import React from "react";

const DlRenewals = () => {
    const stats = [
        { title: "Total Renewals", value: "14,732", change: "+4.2%", icon: "📦", color: "purple" },
        { title: "On Going Renewals", value: "$28,346.00", change: "+12.0%", icon: "💰", color: "blue" },
        { title: "Declined Renewals", value: "1,29,368", change: "-7.6%", icon: "👥", color: "green" },
        { title: "Invalid Documents", value: "35,367", change: "+2.5%", icon: "🛒", color: "yellow" },
    ];

    const countrySales = [
        { country: "France", sales: "5,932", trend: "up" },
        { country: "Spain", sales: "5,383", trend: "down" },
        { country: "Argentina", sales: "4,825", trend: "up" },
        { country: "UAE", sales: "4,527", trend: "up" },
        { country: "Germany", sales: "4,501", trend: "down" },
    ];

    const topCustomers = [
        { name: "Emma Wilson", purchases: 15, amount: "$1,835", image: "https://i.pravatar.cc/40?img=20" },
        { name: "Robert Lewis", purchases: 18, amount: "$2,415", image: "https://i.pravatar.cc/40?img=21" },
        { name: "Angelina Hose", purchases: 21, amount: "$2,341", image: "https://i.pravatar.cc/40?img=22" },
        { name: "Samantha Sam", purchases: 24, amount: "$2,624", image: "https://i.pravatar.cc/40?img=23" },
    ];

    const topSellingProducts = [
        { id: 1, name: "Ethnic School bag for children (24L)", category: "Bags", stock: "In Stock", sales: "5,093", image: "https://i.pravatar.cc/40?img=6" },
        { id: 2, name: "Leather jacket for men (S,M,L,XL)", category: "Clothing", stock: "In Stock", sales: "6,890", image: "https://i.pravatar.cc/40?img=7" },
        { id: 3, name: "Childrens Teddy toy of high quality", category: "Toys", stock: "Out Of Stock", sales: "5,423", image: "https://i.pravatar.cc/40?img=8" },
        { id: 4, name: "Orange smart watch with square dial (24mm)", category: "Fashion", stock: "Out Of Stock", sales: "10,234", image: "https://i.pravatar.cc/40?img=9" }
    ];

    const orders = [
        { id: 1, name: "Amanda Nanes", price: "$229.99", date: "24 May 2022", image: "https://i.pravatar.cc/40?img=10" },
        { id: 2, name: "Peter Parkour", price: "$135.29", date: "18 May 2022", image: "https://i.pravatar.cc/40?img=11" },
        { id: 3, name: "Jackie Chen", price: "$1,299.99", date: "29 May 2022", image: "https://i.pravatar.cc/40?img=12" },
        { id: 4, name: "Ryan Gerica", price: "$249.29", date: "05 Jun 2022", image: "https://i.pravatar.cc/40?img=13" },
        { id: 5, name: "Hugh Jackma", price: "$499.99", date: "15 May 2022", image: "https://i.pravatar.cc/40?img=14" }
    ];

    return (
        <div className="p-6 mt-20 space-y-6">
            <h2 className="text-xl font-semibold">DL Renewal  Stats</h2>
            {/* Top Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <span className={`text-${stat.color}-500 text-2xl`}>{stat.icon}</span>
                        <h3 className="text-gray-700 font-semibold text-sm sm:text-base">{stat.title}</h3>
                        <p className="text-lg sm:text-xl font-bold">{stat.value}</p>
                        <span className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                            {stat.change} this month
                        </span>
                    </div>
                ))}
            </div>

            {/* Top Customers & Country Sales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-700 font-semibold mb-4">Renewals Per Region</h3>
                    {countrySales.map((country, index) => (
                        <div key={index} className="flex justify-between text-sm sm:text-base mb-2">
                            <span>{country.country}</span>
                            <span className={`text-${country.trend === "up" ? "green" : "red"}-500`}>{country.sales}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-700 font-semibold mb-4">Renewals Per County</h3>
                    {topCustomers.map((customer, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <div className="flex items-center space-x-2">
                                <img src={customer.image} alt={customer.name} className="h-8 w-8 rounded-full" />
                                <span>{customer.name}</span>
                            </div>
                            <span className="font-bold">{customer.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Renewals Table */}
            {/* Left and Right Div Container */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">

                {/* Left - Recent Renewals Table */}
                <div className="bg-white p-6 rounded-lg shadow overflow-x-auto lg:w-1/2">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Renewals</h2>
                    <table className="w-full text-left border-collapse text-sm sm:text-base">
                        <thead>
                            <tr className="text-gray-600 bg-gray-100">
                                <th className="p-3">S.no</th>
                                <th className="p-3">Product Name</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Total Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSellingProducts.map((product, index) => (
                                <tr key={product.id} className="border-t">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 flex items-center space-x-2">
                                        <img src={product.image} alt={product.name} className="h-8 w-8 rounded-full" />
                                        <span>{product.name}</span>
                                    </td>
                                    <td className="p-3">{product.category}</td>
                                    <td className={`p-3 ${product.stock === "In Stock" ? "text-green-600" : "text-red-600"}`}>{product.stock}</td>
                                    <td className="p-3">{product.sales}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Right - Awaiting Verification */}
                <div className="bg-white p-6 rounded-lg shadow lg:w-1/2">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Awaiting Verification</h2>
                    <div className="mt-4 space-y-3">
                        {orders.map((order) => (
                            <div key={order.id} className="flex justify-between items-center py-2 border-b">
                                <div className="flex items-center space-x-2">
                                    <img src={order.image} alt={order.name} className="h-8 w-8 rounded-full" />
                                    <span className="text-gray-700 font-medium">{order.name}</span>
                                </div>
                                <span>{order.price}</span>
                                <span className="text-gray-500 text-sm">{order.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default DlRenewals;
