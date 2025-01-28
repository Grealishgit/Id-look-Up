import React from 'react';

const PassportFinder = () => {
    return (
        <div className="max-w-screen-full mx-auto w-full bg-cover bg-center min-h-screen flex flex-col justify-center mt-20 items-center"
            style={{ backgroundImage: "url('/des3.png')" }} id="Passport">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">
                Find <span className="text-green-500">Your <span className='text-red-500'>Passport</span> </span>
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
                Use this tool to locate your processed passport. Simply enter your details below, and we’ll help you check its status or location.
            </p>

            <form className="bg-white shadow-md rounded-md p-8 max-w-xl w-full">
                <div className="mb-4">
                    <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">
                        Passport <span className="text-green-500">Finder.</span>
                    </h1>
                    <label htmlFor="passportNumber" className="block text-gray-700 text-lg  mb-2">
                        Passport-Waiting Number

                    </label>
                    <input
                        type="text"
                        id="passportNumber"
                        name="passportNumber"
                        placeholder="Enter your Passport Number"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-lg  mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="fname"
                        name="name"
                        placeholder="Enter your First Name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <label htmlFor="name" className="block text-gray-700 text-lg  mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lname"
                        name="name"
                        placeholder="Enter your Last Name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <label htmlFor="name" className="block text-gray-700 text-lg  mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="name"
                        placeholder="Enter your Email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                    <label htmlFor="name" className="block text-gray-700 text-lg  mb-2">
                        Phone Number
                    </label>
                    <input
                        type="number"
                        id="phoneNumber"
                        name="name"
                        placeholder="Enter your Phone Number"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>
                <p className='text-gray-500 text-center text-sm mb-2'>Double check the information you provided before proceeding.</p>
                <button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow-md transition-all duration-300"
                >
                    Search Passport
                </button>
                <p className="mt-4 text-center font-semibold text-black">
                    Unable to find your Passport?{' '}
                    <a href="/contact" className="text-green-500 underline text-md font-semibold underline-offset-1  hover:underline">
                        Contact Us
                    </a>
                </p>
            </form>


        </div>
    );
};

export default PassportFinder;
