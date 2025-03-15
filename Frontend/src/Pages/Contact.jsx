import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "2e875a12-b1c8-4f51-b89e-421ace1583cf");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("");
            toast.success("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            toast.error(data.message);
            setResult("");
        }
    }


    return (
        <div className="max-w-screen-full mx-auto mt-10 py-12 px-4 min-h-screen" id="Contact">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                Get in <span className='text-green-500'>Touch</span>  with <span className='text-red-500'>Us</span>
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
                We’d love to hear from you! Whether you have a question, feedback, or need assistance, feel free to reach out.
            </p>

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
                <form onSubmit={onSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="Name"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                            placeholder="Your Name"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="Email"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                            placeholder="Your Email"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Message</label>
                        <textarea

                            name="Message"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md mt-2"
                            placeholder="Your Message"
                            rows="6"
                            required
                        />
                    </div>

                    <button
                        className="w-full py-4 bg-red-500 text-white font-bold rounded-md hover:bg-green-600 transition duration-300"
                    >
                        {result ? result : "Send Message"}
                    </button>
                    <p className="mt-4 text-center font-semibold text-gray-500">
                        Expect an Email from Us within <span className='text-red-500'>48hrs</span> ,
                        if not reach us through a call or visit us in all available <span className='text-green-500'>huduma centers</span> countrywide.{' '}
                    </p>
                </form>
            </div>

            <div className="mt-12 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Contact Information</h2>
                <p className="text-lg text-gray-600">You can also reach us through the following channels:</p>
                <ul className="text-lg text-gray-600 mt-4">
                    <li>Email: <a href="mailto:support@idlookup.com" className="text-blue-500 hover:underline">support@idlookup.com</a></li>
                    <li>Phone: <a href="tel:+254712345678" className="text-blue-500 hover:underline">+254 712 345 678</a></li>
                    <li>Location: Nairobi, Kenya</li>
                </ul>
            </div>
        </div>
    );
};

export default Contact;
