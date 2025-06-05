import React, { useState } from "react";
import { FaLightbulb, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const Skills = ({ formData, setFormData }) => {
  const [activeTab, setActiveTab] = useState("technical");
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({
    id: "",
    name: "",
    level: 3,
    category: ""
  });

  // Initialize skill categories if they don't exist
  const skillCategories = {
    technical: formData.skillCategories?.technical || [
      "Programming Languages",
      "Frameworks & Libraries",
      "Tools & Technologies",
      "Databases",
      "Cloud & DevOps",
      "Design & UI/UX"
    ],
    soft: formData.skillCategories?.soft || [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Teamwork",
      "Time Management",
      "Adaptability"
    ]
  };

  // Save skill categories to main form data if they changed
  const updateSkillCategories = (type, categories) => {
    setFormData(prevData => ({
      ...prevData,
      skillCategories: {
        ...prevData.skillCategories,
        [type]: categories
      }
    }));
  };

  // Add a new skill
  const addSkill = () => {
    if (!newSkill.name.trim() || !newSkill.category) {
      return;
    }

    const skillToAdd = {
      ...newSkill,
      id: uuidv4(),
      type: activeTab
    };

    setFormData(prevData => ({
      ...prevData,
      skills: [...prevData.skills, skillToAdd]
    }));

    // Reset new skill form
    setNewSkill({
      id: "",
      name: "",
      level: 3,
      category: ""
    });
  };

  // Start editing a skill
  const startEditSkill = (skill) => {
    setEditingSkill({ ...skill });
  };

  // Save edited skill
  const saveEditedSkill = () => {
    if (!editingSkill.name.trim() || !editingSkill.category) {
      return;
    }

    setFormData(prevData => ({
      ...prevData,
      skills: prevData.skills.map(skill => 
        skill.id === editingSkill.id ? editingSkill : skill
      )
    }));

    setEditingSkill(null);
  };

  // Delete a skill
  const deleteSkill = (skillId) => {
    setFormData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter(skill => skill.id !== skillId)
    }));
    
    // If currently editing this skill, cancel editing
    if (editingSkill && editingSkill.id === skillId) {
      setEditingSkill(null);
    }
  };

  // Handle new category input
  const [newCategory, setNewCategory] = useState("");
  const addCategory = () => {
    if (!newCategory.trim()) return;
    
    const updatedCategories = [...skillCategories[activeTab], newCategory];
    updateSkillCategories(activeTab, updatedCategories);
    
    setNewCategory("");
  };

  // Delete a category
  const deleteCategory = (categoryName) => {
    const updatedCategories = skillCategories[activeTab].filter(
      category => category !== categoryName
    );
    updateSkillCategories(activeTab, updatedCategories);
    
    // Reset skills that had this category
    const affectedSkills = formData.skills.filter(
      skill => skill.type === activeTab && skill.category === categoryName
    );
    
    if (affectedSkills.length > 0) {
      setFormData(prevData => ({
        ...prevData,
        skills: prevData.skills.map(skill => 
          skill.type === activeTab && skill.category === categoryName
            ? { ...skill, category: "" }
            : skill
        )
      }));
    }
  };

  // Filter skills by the current active tab (technical or soft)
  const filteredSkills = formData.skills.filter(skill => skill.type === activeTab);

  // Group skills by category
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaLightbulb className="mr-2 text-primary-600" />
        Skills
      </h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("technical")}
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === "technical"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Technical Skills
        </button>
        <button
          onClick={() => setActiveTab("soft")}
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === "soft"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Soft Skills
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-700">
            {activeTab === "technical" ? "Technical Skill Categories" : "Soft Skill Categories"}
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category"
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={addCategory}
              className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors flex items-center"
            >
              <FaPlus className="mr-1" size={12} /> Add
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {skillCategories[activeTab].map((category, index) => (
            <div
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center group"
            >
              <span>{category}</span>
              <button
                onClick={() => deleteCategory(category)}
                className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Delete ${category} category`}
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Skill Form */}
      <div className="mb-6 border-t pt-4 border-dashed">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Add New {activeTab === "technical" ? "Technical" : "Soft"} Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={activeTab === "technical" ? "React, Python, etc." : "Leadership, Problem Solving, etc."}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="">Select a category</option>
              {skillCategories[activeTab].map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proficiency Level
            </label>
            <div className="flex items-center">
              <input
                type="range"
                min="1"
                max="5"
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-2 text-gray-700">{newSkill.level}/5</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={addSkill}
            disabled={!newSkill.name.trim() || !newSkill.category}
            className={`px-4 py-2 text-white rounded-md flex items-center ${
              !newSkill.name.trim() || !newSkill.category
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700"
            } transition-colors`}
          >
            <FaPlus className="mr-1" /> Add Skill
          </button>
        </div>
      </div>

      {/* Skills List By Category */}
      <div>
        {Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <FaLightbulb className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-500">No {activeTab} skills added yet</p>
            <p className="text-sm text-gray-400">
              {activeTab === "technical"
                ? "Add languages, frameworks, tools, or other technical abilities"
                : "Add interpersonal skills, leadership qualities, or other soft skills"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category} className="mb-4">
                <h3 className="text-md font-medium text-gray-700 mb-2 border-b pb-1">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className={`border rounded-lg p-3 ${
                        editingSkill && editingSkill.id === skill.id
                          ? "border-primary-400 bg-primary-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {editingSkill && editingSkill.id === skill.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editingSkill.name}
                            onChange={(e) =>
                              setEditingSkill({ ...editingSkill, name: e.target.value })
                            }
                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                          <select
                            value={editingSkill.category}
                            onChange={(e) =>
                              setEditingSkill({ ...editingSkill, category: e.target.value })
                            }
                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                          >
                            <option value="">Select a category</option>
                            {skillCategories[activeTab].map((cat, i) => (
                              <option key={i} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">
                              Level: {editingSkill.level}/5
                            </label>
                            <input
                              type="range"
                              min="1"
                              max="5"
                              value={editingSkill.level}
                              onChange={(e) =>
                                setEditingSkill({
                                  ...editingSkill,
                                  level: parseInt(e.target.value),
                                })
                              }
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingSkill(null)}
                              className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm flex items-center"
                            >
                              <FaTimes className="mr-1" size={12} /> Cancel
                            </button>
                            <button
                              onClick={saveEditedSkill}
                              className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm flex items-center"
                            >
                              <FaSave className="mr-1" size={12} /> Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">{skill.name}</h4>
                              <div className="mt-1">
                                <div className="flex items-center">
                                  <div className="h-2 rounded-full bg-gray-200 w-32">
                                    <div
                                      className="h-2 rounded-full bg-primary-500"
                                      style={{ width: `${(skill.level / 5) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-600 ml-2">
                                    Level {skill.level}/5
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => startEditSkill(skill)}
                                className="p-1 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded transition-colors"
                                aria-label="Edit skill"
                              >
                                <FaEdit size={14} />
                              </button>
                              <button
                                onClick={() => deleteSkill(skill.id)}
                                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                aria-label="Delete skill"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 rounded">
        <p className="text-sm text-blue-700">
          <strong>ATS Tip:</strong> Include skills explicitly mentioned in the job description. For technical roles, emphasize specific technologies and tools, while for management roles, focus on leadership and communication skills.
        </p>
      </div>
    </div>
  );
};

export default Skills;