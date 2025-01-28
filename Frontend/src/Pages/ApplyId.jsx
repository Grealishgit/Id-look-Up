import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const ApplyId = () => {
    const [applicationType, setApplicationType] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleApplicationTypeChange = (e) => {
        setApplicationType(e.target.value);
    };

    const handleProceed = () => {
        // Redirect to the selected application type component
        if (applicationType === 'new') {
            navigate('/new-id');
        } else if (applicationType === 'lost') {
            navigate('/lost-id');
        } else if (applicationType === 'manual') {
            navigate('/forms-upload');
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 bg-gray-300">
            <div className="text-center mb-10 mt-20">
                <h1 className="text-4xl font-bold text-gray-800">
                    Apply <span className="text-green-500">For <span className="text-red-500">ID/Maisha Number</span></span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Begin your journey to obtaining a valid national identification card with ease.
                    Whether you're applying for the first time, need to reapply due to a lost ID,
                    or want to upload manual forms after applying manually, select your option below.
                </p>
            </div>

            {/* Application Type Dropdown */}
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <label htmlFor="applicationType" className="block text-lg font-semibold text-gray-700 mb-2">
                    Select Application Type
                </label>
                <select
                    id="applicationType"
                    value={applicationType}
                    onChange={handleApplicationTypeChange}
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="" disabled>
                        -- Choose an option --
                    </option>
                    <option value="new">Here to apply for a new ID?</option>
                    <option value="lost">Here to apply for a lost ID?</option>
                    <option value="manual">Here to upload manual forms after ID was applied manually?</option>
                </select>
                {/* Proceed Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={handleProceed}
                        className="bg-blue-500 hover:bg-green-500 text-white px-8 py-3 rounded-md text-xl font-semibold"
                        disabled={!applicationType} // Disable button if no option is selected
                    >
                        Proceed
                    </button>
                </div>
            </div>


        </div>
    );
};

export default ApplyId;
