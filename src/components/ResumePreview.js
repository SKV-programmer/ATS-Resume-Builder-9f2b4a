import React, { useRef } from "react";
import { FaDownload, FaPalette, FaEye, FaEyeSlash } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const ResumePreview = ({ formData, theme, showPreview, setShowPreview }) => {
  const resumeRef = useRef(null);

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const dataUrl = await toPng(resumeRef.current, { quality: 0.95 });
      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  if (!showPreview) {
    return (
      <div className="fixed top-0 right-0 p-4">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-primary-700 transition-colors"
        >
          <FaEye className="mr-2" />
          Show Preview
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 w-1/2 h-screen bg-gray-100 shadow-xl overflow-auto">
      {/* Preview Controls */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPreview(false)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <FaEyeSlash className="mr-1" />
            Hide Preview
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <FaPalette className="text-primary-600" />
            <select
              className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={theme.name}
              onChange={(e) => console.log("Theme change:", e.target.value)}
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
        </div>
        <button
          onClick={downloadAsPDF}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FaDownload className="mr-1" />
          Download PDF
        </button>
      </div>

      {/* Resume Preview */}
      <div className="p-8">
        <div
          ref={resumeRef}
          className="bg-white shadow-lg mx-auto w-[21cm] min-h-[29.7cm] p-8"
          style={{ ...theme.styles }}
        >
          {/* Header Section */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {formData.personalInfo.fullName || "Your Name"}
            </h1>
            <h2 className="text-xl text-primary-600 mb-4">
              {formData.personalInfo.jobTitle || "Professional Title"}
            </h2>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {formData.personalInfo.email && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="88" y1="148" x2="64" y2="148" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="168 144 168 24 200 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M232,176V116a52,52,0,0,0-52-52H76a52,52,0,0,1,52,52v68h96A8,8,0,0,0,232,176Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M128,224V184H32a8,8,0,0,1-8-8V116A52,52,0,0,1,76,64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-2">{formData.personalInfo.email}</span>
                </div>
              )}
              {formData.personalInfo.phone && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="64" y="24" width="128" height="208" rx="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="64" y1="64" x2="192" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="64" y1="192" x2="192" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-2">{formData.personalInfo.phone}</span>
                </div>
              )}
              {formData.personalInfo.location && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-2">{formData.personalInfo.location}</span>
                </div>
              )}
            </div>

            {formData.personalInfo.summary && (
              <p className="mt-4 text-gray-700 leading-relaxed">
                {formData.personalInfo.summary}
              </p>
            )}
          </header>

          {/* Experience Section */}
          {formData.experience?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">
                Professional Experience
              </h2>
              {formData.experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {exp.position}
                      </h3>
                      <div className="text-primary-600 font-medium">
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {exp.startDate && (
                        <>
                          {new Date(exp.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric"
                          })}
                          {" - "}
                          {exp.current
                            ? "Present"
                            : exp.endDate &&
                              new Date(exp.endDate).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric"
                              })}
                        </>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-2">{exp.description}</p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education Section */}
          {formData.education?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">
                Education
              </h2>
              {formData.education.map((edu) => (
                <div key={edu.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <div className="text-primary-600 font-medium">
                        {edu.institution}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {edu.startDate && (
                        <>
                          {new Date(edu.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric"
                          })}
                          {" - "}
                          {edu.current
                            ? "Present"
                            : edu.endDate &&
                              new Date(edu.endDate).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric"
                              })}
                        </>
                      )}
                    </div>
                  </div>
                  {edu.highlights && (
                    <p className="text-gray-700">{edu.highlights}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Skills Section */}
          {formData.skills?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">
                Skills
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Technical Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Technical Skills
                  </h3>
                  <div className="space-y-2">
                    {formData.skills
                      .filter((skill) => skill.type === "technical")
                      .map((skill) => (
                        <div key={skill.id} className="flex items-center">
                          <span className="text-gray-700">{skill.name}</span>
                          <div className="ml-2 flex-1 h-1.5 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-primary-600 rounded-full"
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Soft Skills
                  </h3>
                  <div className="space-y-2">
                    {formData.skills
                      .filter((skill) => skill.type === "soft")
                      .map((skill) => (
                        <div key={skill.id} className="flex items-center">
                          <span className="text-gray-700">{skill.name}</span>
                          <div className="ml-2 flex-1 h-1.5 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-primary-600 rounded-full"
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Links Section */}
          {(formData.personalInfo.linkedin ||
            formData.personalInfo.github ||
            formData.personalInfo.website) && (
            <section className="mt-8 pt-8 border-t">
              <div className="flex gap-4 text-sm text-gray-600">
                {formData.personalInfo.linkedin && (
                  <a
                    href={formData.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="32" y="32" width="192" height="192" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="124" y1="120" x2="124" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="84" y1="120" x2="84" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M124,148a28,28,0,0,1,56,0v28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="84" cy="80" r="16"/></svg>
                    <span className="ml-1">LinkedIn</span>
                  </a>
                )}
                {formData.personalInfo.github && (
                  <a
                    href={formData.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M119.83,56A52,52,0,0,0,76,32a51.92,51.92,0,0,0-3.49,44.7A49.28,49.28,0,0,0,64,104v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.28,49.28,0,0,0-8.51-27.3A51.92,51.92,0,0,0,196,32a52,52,0,0,0-43.83,24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M104,232V192a32,32,0,0,1,32-32h0a32,32,0,0,1,32,32v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M104,208H76a32,32,0,0,1-32-32,32,32,0,0,0-32-32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    <span className="ml-1">GitHub</span>
                  </a>
                )}
                {formData.personalInfo.website && (
                  <a
                    href={formData.personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    <span className="ml-1">Portfolio</span>
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;