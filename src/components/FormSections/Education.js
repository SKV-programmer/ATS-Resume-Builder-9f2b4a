import React, { useState } from "react";
import { FaGraduationCap, FaPlus, FaTrash, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

const Education = ({ formData, setFormData }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  // Add new education entry
  const addEducation = () => {
    const newEducation = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      highlights: ""
    };

    setFormData((prevData) => ({
      ...prevData,
      education: [...prevData.education, newEducation]
    }));
    setActiveIndex(formData.education.length);
  };

  // Remove education entry
  const removeEducation = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education.filter(item => item.id !== id)
    }));
    setActiveIndex(null);
  };

  // Update education entry fields
  const handleEducationChange = (id, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const toggleCurrent = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education.map(item => 
        item.id === id 
          ? { ...item, current: !item.current, endDate: !item.current ? "" : item.endDate } 
          : item
      )
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaGraduationCap className="mr-2 text-primary-600" />
          Education
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-primary-600 transition-colors"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse education section" : "Expand education section"}
        >
          {isExpanded ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {formData.education.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <FaGraduationCap className="mx-auto text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500">No education entries yet</p>
              <p className="text-sm text-gray-400 mb-4">Add your degrees, certifications, or courses</p>
              <button
                onClick={addEducation}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center mx-auto"
              >
                <FaPlus className="mr-1" /> Add Education
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {formData.education.map((edu, index) => (
                  <div key={edu.id} className="border rounded-lg overflow-hidden">
                    {/* Education Header - Always visible */}
                    <div 
                      className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${
                        activeIndex === index ? "bg-primary-50 border-b border-primary-100" : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {edu.degree || edu.field 
                            ? `${edu.degree || ""} ${edu.field ? `in ${edu.field}` : ""}` 
                            : "New Education Entry"}
                        </h3>
                        {edu.institution && (
                          <p className="text-sm text-gray-600">{edu.institution}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeEducation(edu.id);
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          aria-label="Remove education entry"
                        >
                          <FaTrash size={14} />
                        </button>
                        {activeIndex === index ? <FaCaretUp /> : <FaCaretDown />}
                      </div>
                    </div>
                    
                    {/* Education Details - Expandable */}
                    {activeIndex === index && (
                      <div className="p-4 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Institution
                            </label>
                            <input
                              type="text"
                              value={edu.institution || ""}
                              onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="University or School Name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              value={edu.location || ""}
                              onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="City, State or Country"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Degree
                            </label>
                            <input
                              type="text"
                              value={edu.degree || ""}
                              onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Bachelor's, Master's, PhD, Certificate, etc."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Field of Study
                            </label>
                            <input
                              type="text"
                              value={edu.field || ""}
                              onChange={(e) => handleEducationChange(edu.id, "field", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Computer Science, Business, etc."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Start Date
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IoCalendarOutline className="text-gray-400" />
                              </div>
                              <input
                                type="month"
                                value={edu.startDate || ""}
                                onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                                className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                              </label>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`current-education-${edu.id}`}
                                  checked={edu.current || false}
                                  onChange={() => toggleCurrent(edu.id)}
                                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor={`current-education-${edu.id}`}
                                  className="ml-2 block text-sm text-gray-700"
                                >
                                  Current
                                </label>
                              </div>
                            </div>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IoCalendarOutline className="text-gray-400" />
                              </div>
                              <input
                                type="month"
                                value={edu.endDate || ""}
                                onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
                                disabled={edu.current}
                                className={`w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                  edu.current ? "bg-gray-100 text-gray-500" : ""
                                }`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              GPA (optional)
                            </label>
                            <input
                              type="text"
                              value={edu.gpa || ""}
                              onChange={(e) => handleEducationChange(edu.id, "gpa", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="3.8/4.0"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Additional Information
                            </label>
                            <textarea
                              value={edu.highlights || ""}
                              onChange={(e) => handleEducationChange(edu.id, "highlights", e.target.value)}
                              rows="3"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Relevant coursework, achievements, honors, etc."
                            ></textarea>
                            <p className="mt-1 text-xs text-gray-500">
                              Include honors, relevant coursework, thesis title, or other notable achievements.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={addEducation}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center"
                >
                  <FaPlus className="mr-1" /> Add Another Education
                </button>
              </div>
            </>
          )}
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4 rounded">
            <p className="text-sm text-blue-700">
              <strong>ATS Tip:</strong> List your most recent or relevant education first. If you have extensive work experience, you can place education after your work experience section.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;