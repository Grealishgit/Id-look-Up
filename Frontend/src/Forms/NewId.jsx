import React, { useState } from 'react';

const NewId = () => {
    const [step, setStep] = useState(1); // Step state to manage the form's current step

    // State to control the visibility of file upload fields in the third form
    const [fileUploads, setFileUploads] = useState({
        birthCertificate: false,
        religionCard: false,
        fathersId: false,
        mothersId: false,
        husbandsId: false
    });

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1); // Move to the next form
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1); // Move to the previous form
        }
    };

    // Toggle file upload visibility
    const handleFileToggle = (field) => {
        setFileUploads((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    return (
        <div className="min-h-screen py-12 px-4 bg-gray-300">
            <div className="text-center mb-10 mt-20">
                <h1 className="text-4xl font-bold text-gray-800">
                    Apply <span className="text-green-500">For <span className="text-red-500">ID/Maisha Number</span></span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Begin your journey to obtaining a valid national identification card with ease.
                    Complete the forms below by providing the required information for each section.
                </p>
            </div>

            {/* Step Navigation */}
            <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-4xl">
                {step === 1 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-center">Personal Details</h2>
                        <p className='text-gray-600 text-center mb-4'>Fill with <span className='text-red-500 font-semibold'>"N/A"</span>  if not available or applicable</p>
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block">Passport Number</label>
                                    <input type="text" placeholder='A12345678' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Birth Certificate Number</label>
                                    <input type="text" placeholder='123-45678-6879' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Date of Birth</label>
                                    <input type="date" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                                <div>
                                    <label className="block">First Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Middle Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Last Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">

                                <div>
                                    <label className="block">Father's First Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Father's Middle Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Father's last Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                                <div>
                                    <label className="block">Mother's First Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Mother's Middle Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Mother's Last Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <p className='text-center font-semibold text-gray-500 mt-4'>
                                For married women, please enter your husband's details, if not married fill with <span className='text-red-500'>"N/A"</span> </p>
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                                <div className="mt-4">
                                    <label className="block">Husband's First Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block">Husband's Middle Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block">Husband's Last Name</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 '>
                                <div className="mt-4">
                                    <label className="block">Father's ID</label>
                                    <input type="text" placeholder='12345678' className="w-full p-2 border border-gray-300 rounded" />
                                </div>

                                <div className="mt-4">
                                    <label className="block">Mother's ID</label>
                                    <input type="text" placeholder='12345678' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="mt-4">
                                    <label className="block">Husband's ID</label>
                                    <input type="text" placeholder='12345678' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="ml-2">I am above 18 years of age</span>
                                </label>
                            </div>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Place of Birth Details</h2>
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block">Home County</label>
                                    <input type="text" placeholder='Nairobi' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Birth Sub-county</label>
                                    <input type="text" placeholder='Pangani' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Home Sub-County</label>
                                    <input type="text" placeholder='Ahero' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>



                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                <div>
                                    <label className="block">Current-County</label>
                                    <input type="text" placeholder='Nandi' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Location</label>
                                    <input type="text" placeholder='Ekero' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Sub-Location</label>
                                    <input type="text" placeholder='Kaptet' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                <div>
                                    <label className="block">Constituency</label>
                                    <input type="text" placeholder='Mwembe Tayari' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Village</label>
                                    <input type="text" placeholder='kitusuru' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Ward</label>
                                    <input type="text" placeholder='Lusheya/Lubinu' className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                <div>
                                    <label className="block">Tribe</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Clan</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div>
                                    <label className="block">Family</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Documents to Submit</h2>
                        <form>
                            {/* Birth Certificate */}
                            <div className="mt-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={fileUploads.birthCertificate}
                                        onChange={() => handleFileToggle('birthCertificate')}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Birth Certificate Number</span>
                                </label>
                                {fileUploads.birthCertificate && (
                                    <input type="file" className="w-full p-2 border border-gray-300 mt-2" />
                                )}
                            </div>

                            {/* Religion Card */}
                            <div className="mt-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={fileUploads.religionCard}
                                        onChange={() => handleFileToggle('religionCard')}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Religion Card</span>
                                </label>
                                {fileUploads.religionCard && (
                                    <input type="file" className="w-full p-2 border border-gray-300 mt-2" />
                                )}
                            </div>

                            {/* Father's ID */}
                            <div className="mt-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={fileUploads.fathersId}
                                        onChange={() => handleFileToggle('fathersId')}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Father's ID</span>
                                </label>
                                {fileUploads.fathersId && (
                                    <input type="file" className="w-full p-2 border border-gray-300 mt-2" />
                                )}
                            </div>

                            {/* Mother's ID */}
                            <div className="mt-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={fileUploads.mothersId}
                                        onChange={() => handleFileToggle('mothersId')}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Mother's ID</span>
                                </label>
                                {fileUploads.mothersId && (
                                    <input type="file" className="w-full p-2 border border-gray-300 mt-2" />
                                )}
                            </div>

                            {/* Husband's ID */}
                            <div className="mt-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={fileUploads.husbandsId}
                                        onChange={() => handleFileToggle('husbandsId')}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Husband's ID</span>
                                </label>
                                {fileUploads.husbandsId && (
                                    <input type="file" className="w-full p-2 border border-gray-300 mt-2" />
                                )}
                            </div>
                        </form>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePrevious}
                        className="bg-red-400 text-white hover:bg-green-500 px-4 py-2 rounded-md"
                        disabled={step === 1} // Disable Previous on step 1
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-blue-500 text-white hover:bg-green-500 px-6 py-2 rounded-md"
                        disabled={step === 3} // Disable Next on step 3
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewId;
