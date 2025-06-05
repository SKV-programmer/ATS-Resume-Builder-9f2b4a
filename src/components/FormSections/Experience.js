import React, { useState } from "react";
import { FaBriefcase, FaPlus, FaTrash, FaCaretDown, FaCaretUp, FaCheck } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

const Experience = ({ formData, setFormData }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  // Add new experience entry
  const addExperience = () => {
    const newExperience = {
      id: uuidv4(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""]
    };

    setFormData((prevData) => ({
      ...prevData,
      experience: [...prevData.experience, newExperience]
    }));
    setActiveIndex(formData.experience.length);
  };

  // Remove experience entry
  const removeExperience = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      experience: prevData.experience.filter(item => item.id !== id)
    }));
    setActiveIndex(null);
  };

  // Update experience entry fields
  const handleExperienceChange = (id, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      experience: prevData.experience.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Toggle current job checkbox
  const toggleCurrent = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      experience: prevData.experience.map(item => 
        item.id === id 
          ? { ...item, current: !item.current, endDate: !item.current ? "" : item.endDate } 
          : item
      )
    }));
  };

  // Add new achievement bullet
  const addAchievement = (id) => {
    setFormData((prevData) => ({
      ...prevData,
      experience: prevData.experience.map(item => 
        item.id === id 
          ? { ...item, achievements: [...item.achievements, ""] } 
          : item
      )
    }));
  };

  // Update achievement bullet
  const updateAchievement = (id, index, value) => {
    setFormData((prevData) => ({
      ...prevData,
      experience: prevData.experience.map(item => {
        if (item.id === id) {
          const updatedAchievements = [...item.achievements];
          updatedAchievements[index] = value;
          return { ...item, achievements: updatedAchievements };
        }
        return item;
      })
    }));
  };

  // Remove achievement bullet
  const removeAchievement = (id, index) => {
    setFormData((prevData) => ({
      ...prevData,
      experience: prevData.experience.map(item => {
        if (item.id === id && item.achievements.length > 1) {
          const updatedAchievements = item.achievements.filter((_, i) => i !== index);
          return { ...item, achievements: updatedAchievements };
        }
        return item;
      })
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaBriefcase className="mr-2 text-primary-600" />
          Work Experience
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-primary-600 transition-colors"
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse experience section" : "Expand experience section"}
        >
          {isExpanded ? <FaCaretUp size={20} /> : <FaCaretDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {formData.experience.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <FaBriefcase className="mx-auto text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500">No work experience added yet</p>
              <p className="text-sm text-gray-400 mb-4">Add your work history to highlight your professional experience</p>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center mx-auto"
              >
                <FaPlus className="mr-1" /> Add Work Experience
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {formData.experience.map((exp, index) => (
                  <div key={exp.id} className="border rounded-lg overflow-hidden">
                    {/* Experience Header - Always visible */}
                    <div 
                      className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${
                        activeIndex === index ? "bg-primary-50 border-b border-primary-100" : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {exp.position || "New Position"}
                        </h3>
                        {exp.company && (
                          <p className="text-sm text-gray-600">{exp.company}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeExperience(exp.id);
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          aria-label="Remove experience entry"
                        >
                          <FaTrash size={14} />
                        </button>
                        {activeIndex === index ? <FaCaretUp /> : <FaCaretDown />}
                      </div>
                    </div>
                    
                    {/* Experience Details - Expandable */}
                    {activeIndex === index && (
                      <div className="p-4 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Job Title
                            </label>
                            <input
                              type="text"
                              value={exp.position || ""}
                              onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="e.g., Software Engineer"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company
                            </label>
                            <input
                              type="text"
                              value={exp.company || ""}
                              onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="e.g., Google Inc."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              value={exp.location || ""}
                              onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="e.g., San Francisco, CA (or Remote)"
                            />
                          </div>

                          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  value={exp.startDate || ""}
                                  onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
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
                                    id={`current-job-${exp.id}`}
                                    checked={exp.current || false}
                                    onChange={() => toggleCurrent(exp.id)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                  />
                                  <label
                                    htmlFor={`current-job-${exp.id}`}
                                    className="ml-2 block text-sm text-gray-700"
                                  >
                                    Current Job
                                  </label>
                                </div>
                              </div>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <IoCalendarOutline className="text-gray-400" />
                                </div>
                                <input
                                  type="month"
                                  value={exp.endDate || ""}
                                  onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                                  disabled={exp.current}
                                  className={`w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                                    exp.current ? "bg-gray-100 text-gray-500" : ""
                                  }`}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Job Description
                            </label>
                            <textarea
                              value={exp.description || ""}
                              onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                              rows="3"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              placeholder="Briefly describe your role and responsibilities..."
                            ></textarea>
                          </div>

                          <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Key Achievements
                              </label>
                              <button
                                type="button"
                                onClick={() => addAchievement(exp.id)}
                                className="text-xs flex items-center px-2 py-1 bg-primary-50 text-primary-600 rounded hover:bg-primary-100"
                              >
                                <FaPlus className="mr-1" size={10} /> Add Achievement
                              </button>
                            </div>
                            
                            <p className="text-xs text-gray-500 mb-3">
                              Use bullet points to highlight specific achievements. Start with action verbs and include metrics where possible.
                            </p>
                            
                            {exp.achievements.map((achievement, achIndex) => (
                              <div key={achIndex} className="flex items-start mb-2 group">
                                <div className="pt-2 pr-2 text-primary-600">
                                  <FaCheck size={12} />
                                </div>
                                <div className="flex-grow">
                                  <textarea
                                    value={achievement}
                                    onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                                    rows="2"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="e.g., Increased revenue by 20% through implementation of new marketing strategy"
                                  ></textarea>
                                </div>
                                {exp.achievements.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeAchievement(exp.id, achIndex)}
                                    className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Remove achievement"
                                  >
                                    <FaTrash size={12} />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={addExperience}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center"
                >
                  <FaPlus className="mr-1" /> Add Another Position
                </button>
              </div>
            </>
          )}
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4 rounded">
            <p className="text-sm text-blue-700">
              <strong>ATS Tip:</strong> Use relevant keywords from the job description. Focus on accomplishments with measurable results rather than just listing responsibilities.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;