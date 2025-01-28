import React, { useState } from 'react';
const counties = [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo',
    'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui',
    'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori',
    'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyanza', 'Samburu', 'Siaya', 'Taita Taveta',
    'Tana River', 'Tharaka Nithi', 'Trans-Nzoia', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot', 'Nyandarua',
    'Nyeri', 'Zanzibar'
];

// Sample mapping of counties to sub-counties (example)
const countySubCounties = {
    Nairobi: ['Kasarani', 'Starehe', 'Westlands', 'Lang’ata'],
    Kakamega: ['Kakamega Central', 'Kakamega North', 'Kakamega South', 'Mumias-East', 'Mumias-West', 'Khayega', 'Khwisero'],
    Kiambu: ['Kiambu Town', 'Ruiru', 'Thika'],
    Mombasa: ['Mombasa Town', 'Likoni', 'Changamwe'],
    // Add other counties with their sub-counties as needed
};

const handleCountyChange = (e) => {
    const county = e.target.value;
    setSelectedCounty(county);
    setSubCounties(countySubCounties[county] || []); // Set sub-counties based on selected county
};
const LostId = () => {
    const [image, setImage] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [subCounties, setSubCounties] = useState([]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    }
    return (
        <div className="max-w-screen-full mt-10 mx-auto py-12 px-4 bg-teal-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                Apply <span className="text-green-500">For <span className='text-red-500'>A Lost ID</span> </span>
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
                Please enter your details below to apply for  your lost ID/Maisha Number.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-[700px] mx-auto">
                {/* Image Upload */}

                <div className="flex justify-center mb-6">
                    {image ? (
                        <img src={image} alt="Uploaded" className="w-32 h-32 object-cover rounded-full" />
                    ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>

                <label htmlFor='passportPhoto' className='block text-gray-700 mb-2'>Passport-sized Photo</label>
                <input
                    type="file"
                    onChange={handleImageUpload}
                    className="mb-6 w-full py-2 px-4 border border-gray-300 rounded-md"
                    required
                />

                {/* Form Fields */}
                <div>
                    <label htmlFor="idNumber" className="block text-gray-700">ID/Maisha Number</label>
                    <input
                        type="text"
                        id="idNumber"
                        className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                        placeholder="12345678"
                        required
                    />
                </div>
                <form>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                placeholder="Abdul"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="middleName" className="block text-gray-700">Middle Name</label>
                            <input
                                type="text"
                                id="middleName"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                placeholder="Kiprotich"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                placeholder="Omondi"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className='text-center mb-2 text-lg font-semibold'>Place Of Birth Details</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="county" className="block text-gray-700">County</label>
                            <select
                                id="county"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                onChange={handleCountyChange}
                                value={selectedCounty}
                            >
                                <option value="">Select County</option>
                                {counties.map((county, index) => (
                                    <option key={index} value={county}>{county}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="subCounty" className="block text-gray-700">Sub-County</label>
                            <select
                                id="subCounty"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                            >
                                <option value="">Select Sub-County</option>
                                {subCounties.map((subCounty, index) => (
                                    <option key={index} value={subCounty}>{subCounty}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="constituency" className="block text-gray-700">Constituency</label>
                            <input
                                type="text"
                                id="constituency"
                                className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                                placeholder="Westlands"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="ward" className="block text-gray-700">Ward</label>
                        <input
                            type="text"
                            id="ward"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                            placeholder="Parklands"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-red-500 text-white font-bold rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Apply
                    </button>
                    <div>
                        <p className="mt-4 text-center font-semibold text-black">
                            Already Applied?{' '}
                            <a href="/contact" className="text-green-500 underline text-md font-semibold underline-offset-1  hover:underline">
                                Contact Us
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LostId