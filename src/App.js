import React, { useState, useEffect } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";

const App = () => {
  const [showPreview, setShowPreview] = useState(true);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData ? JSON.parse(savedData) : {
      personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        summary: "",
        profilePicture: ""
      },
      experience: [],
      education: [],
      skills: [],
      skillCategories: {
        technical: [
          "Programming Languages",
          "Frameworks & Libraries",
          "Tools & Technologies",
          "Databases",
          "Cloud & DevOps",
          "Design & UI/UX"
        ],
        soft: [
          "Leadership",
          "Communication",
          "Problem Solving",
          "Teamwork",
          "Time Management",
          "Adaptability"
        ]
      }
    };
  });

  const [theme, setTheme] = useState({
    name: "modern",
    styles: {
      fontFamily: "Inter, sans-serif",
      colors: {
        primary: "#0284c7",
        secondary: "#075985",
        text: "#1f2937",
        background: "#ffffff"
      }
    }
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(formData));
  }, [formData]);

  // Reset form data
  const resetForm = () => {
    setFormData({
      personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        summary: "",
        profilePicture: ""
      },
      experience: [],
      education: [],
      skills: [],
      skillCategories: {
        technical: [
          "Programming Languages",
          "Frameworks & Libraries",
          "Tools & Technologies",
          "Databases",
          "Cloud & DevOps",
          "Design & UI/UX"
        ],
        soft: [
          "Leadership",
          "Communication",
          "Problem Solving",
          "Teamwork",
          "Time Management",
          "Adaptability"
        ]
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="32" height="32"><rect width="256" height="256" fill="none"/><path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="192 176 127.99 136 64 176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              <h1 className="ml-2 text-2xl font-bold text-gray-900">ATS Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Auto-saving enabled
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Form Section */}
          <div className={`${showPreview ? "w-1/2" : "w-full"} transition-all duration-300`}>
            <ResumeForm
              formData={formData}
              setFormData={setFormData}
              resetForm={resetForm}
            />
          </div>

          {/* Preview Section */}
          <ResumePreview
            formData={formData}
            theme={theme}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Built with React and Tailwind CSS
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;