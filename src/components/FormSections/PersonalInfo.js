import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const PersonalInfo = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [name]: value
            }
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaUser className="mr-2 text-primary-600" />
                Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profile Picture Upload */}
                <div className="md:col-span-2 flex flex-col items-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-2 overflow-hidden border-2 border-primary-200">
                        {formData.personalInfo.profilePicture ? (
                            <img 
                                src={formData.personalInfo.profilePicture} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FaUser className="text-4xl text-gray-400" />
                        )}
                    </div>
                </div>

                {/* Full Name */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.personalInfo.fullName || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                {/* Job Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.personalInfo.jobTitle || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Senior Software Engineer"
                    />
                </div>

                {/* Email */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.personalInfo.email || ""}
                            onChange={handleChange}
                            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="john.doe@example.com"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.personalInfo.phone || ""}
                            onChange={handleChange}
                            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdLocationOn className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="location"
                            value={formData.personalInfo.location || ""}
                            onChange={handleChange}
                            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="San Francisco, CA"
                        />
                    </div>
                </div>

                {/* Website */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Portfolio Website
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaGlobe className="text-gray-400" />
                        </div>
                        <input
                            type="url"
                            name="website"
                            value={formData.personalInfo.website || ""}
                            onChange={handleChange}
                            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="https://yourwebsite.com"
                        />
                    </div>
                </div>

                {/* LinkedIn */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn Profile
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLinkedin className="text-gray-400" />
                        </div>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.personalInfo.linkedin || ""}
                            onChange={handleChange}
                            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>
                </div>

                {/* GitHub */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        GitHub Profile
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaGithub className="text-gray-400" />
                        </div>
                        <input
                            type="url"
                            name="github"
                            value={formData.personalInfo.github || ""}
                            onChange={handleChange}
                            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="https://github.com/username"
                        />
                    </div>
                </div>

                {/* Professional Summary */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Summary
                    </label>
                    <textarea
                        name="summary"
                        value={formData.personalInfo.summary || ""}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Write a compelling professional summary that highlights your key achievements and career objectives..."
                    ></textarea>
                    <p className="mt-1 text-sm text-gray-500">
                        Keep it concise and impactful. Aim for 3-4 sentences that highlight your expertise and career goals.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;