import React, { useState } from "react";
import { FaRegSave, FaUndo, FaLightbulb } from "react-icons/fa";
import PersonalInfo from "./FormSections/PersonalInfo";
import Experience from "./FormSections/Experience";
import Education from "./FormSections/Education";
import Skills from "./FormSections/Skills";

const ResumeForm = ({ formData, setFormData, resetForm }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [showTips, setShowTips] = useState(true);

  // Sections to be displayed in the form
  const sections = [
    { id: "personal", name: "Personal Info", component: PersonalInfo },
    { id: "experience", name: "Experience", component: Experience },
    { id: "education", name: "Education", component: Education },
    { id: "skills", name: "Skills", component: Skills },
  ];

  // Save current data to local storage
  const saveToLocalStorage = () => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
    
    // Show saved notification (you might want to implement this with a state)
    const notification = document.getElementById("save-notification");
    if (notification) {
      notification.classList.remove("opacity-0");
      notification.classList.add("opacity-100");
      
      setTimeout(() => {
        notification.classList.remove("opacity-100");
        notification.classList.add("opacity-0");
      }, 3000);
    }
  };

  // Reset form with confirmation
  const handleResetClick = () => {
    if (window.confirm("Are you sure you want to reset the form? All your data will be lost.")) {
      resetForm();
    }
  };

  // Toggle ATS tips visibility
  const toggleTips = () => {
    setShowTips(!showTips);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Form Header */}
      <div className="bg-gray-800 text-white px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Resume Builder</h2>
          <div className="flex space-x-3">
            <button
              onClick={saveToLocalStorage}
              className="px-3 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors text-sm flex items-center"
            >
              <FaRegSave className="mr-1" /> Save
            </button>
            <button
              onClick={handleResetClick}
              className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm flex items-center"
            >
              <FaUndo className="mr-1" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Save Notification */}
      <div 
        id="save-notification" 
        className="fixed top-5 right-5 bg-primary-600 text-white px-4 py-2 rounded-md shadow-lg opacity-0 transition-opacity duration-300"
      >
        Resume data saved!
      </div>

      {/* Section Navigation */}
      <div className="flex overflow-x-auto bg-white border-b sticky top-0 z-10">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
              activeSectionIndex === index
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
            onClick={() => setActiveSectionIndex(index)}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* ATS Tips Toggle */}
      <div className="bg-blue-50 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <FaLightbulb className="text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-700">ATS Tips</span>
        </div>
        <button
          onClick={toggleTips}
          className="text-xs bg-blue-700 text-white py-1 px-3 rounded-full hover:bg-blue-800"
        >
          {showTips ? "Hide Tips" : "Show Tips"}
        </button>
      </div>

      {/* Form Content */}
      <div className="px-4 py-6 md:p-6 overflow-y-auto max-h-[calc(100vh-180px)]">
        {React.createElement(sections[activeSectionIndex].component, {
          formData,
          setFormData,
          showTips
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="p-4 border-t bg-gray-50 flex justify-between">
        <button
          disabled={activeSectionIndex === 0}
          onClick={() => setActiveSectionIndex(activeSectionIndex - 1)}
          className={`px-4 py-2 rounded ${
            activeSectionIndex === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        
        <div className="flex items-center space-x-1">
          {sections.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeSectionIndex ? "bg-primary-600" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

        <button
          disabled={activeSectionIndex === sections.length - 1}
          onClick={() => setActiveSectionIndex(activeSectionIndex + 1)}
          className={`px-4 py-2 rounded ${
            activeSectionIndex === sections.length - 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary-600 text-white hover:bg-primary-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;