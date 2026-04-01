import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { FaUsers, FaProjectDiagram } from "react-icons/fa";
import { projectService } from "../../services/projectService";
import { FaUserPlus } from "react-icons/fa";

const ProjectManagers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
const [selectedProject, setSelectedProject] = useState(null);
const [employees, setEmployees] = useState([]);
const [selectedEmployees, setSelectedEmployees] = useState([]);
const [formData, setFormData] = useState({
  title: "",
  description: "",
  projectManager: ""
});
const openAssignModal = (projectId) => {
  setSelectedProject(projectId);
  setAssignModal(true);
  fetchEmployees(); // API call
};

  // Get user role and fetch data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user?.role || '');
    
    if (user?.role === 'MANAGER') {
      fetchMyTeam();
    } else if (user?.role === 'ADMIN' || user?.role === 'HR') {
      fetchAllProjects();
    }
  }, []);

  const fetchMyTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectService.getMyTeam();
      setData(response || []);
    } catch (error) {
      console.error('Error fetching team:', error);
      setError(error.message || 'Failed to fetch team');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectService.getAllProjects();
      setData(response || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error.message || 'Failed to fetch projects');
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateProject = async () => {
  try {
    await projectService.createProject(formData);

    setShowModal(false);
    fetchAllProjects(); // refresh list
  } catch (err) {
    console.error("Error creating project:", err);
  }
};
const handleAssignTeam = async () => {
  try {
    for (let empId of selectedEmployees) {
      await projectService.assignTeam({
        projectId: selectedProject,
        employeeId: empId
      });
    }

    setAssignModal(false);
    fetchAllProjects();
  } catch (err) {
    console.error(err);
  }
};
const fetchEmployees = async () => {
  try {
    const res = await projectService.getAllEmployees(); // backend API
    setEmployees(res || []);
  } catch (err) {
    console.error("Error fetching employees:", err);
  }
};

  return (
    <DashboardLayout>
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h2>All Projects</h2>

  <button
    onClick={() => setShowModal(true)}
    style={{
      background: "#0ea5e9",
      color: "#fff",
      padding: "8px 16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    + Create Project
  </button>
</div>
        <h2 style={{ marginBottom: "20px" }}>
          {userRole === 'MANAGER' ? (
            <>
              <FaUsers style={{ marginRight: "10px" }} />
              My Project Team
            </>
          ) : (
            <>
              <FaProjectDiagram style={{ marginRight: "10px" }} />
              All Projects
            </>
          )}
        </h2>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #0ea5e9",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <p style={{ marginTop: "10px", color: "#666" }}>
              {userRole === 'MANAGER' ? 'Loading team members...' : 'Loading projects...'}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ color: "#e74c3c", marginBottom: "10px" }}>
              {error}
            </div>
            <button
              onClick={userRole === 'MANAGER' ? fetchMyTeam : fetchAllProjects}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                background: "#0ea5e9",
                color: "white",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Data Display */}
        {!loading && !error && (
          <>
            {data.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                {userRole === 'MANAGER' ? (
                  <>
                    <FaUsers size={48} style={{ marginBottom: "10px", opacity: 0.5 }} />
                    <p>No team members found</p>
                    <p style={{ fontSize: "14px" }}>
                      You haven't been assigned any team members yet.
                    </p>
                  </>
                ) : (
                  <>
                    <FaProjectDiagram size={48} style={{ marginBottom: "10px", opacity: 0.5 }} />
                    <p>No projects found</p>
                    <p style={{ fontSize: "14px" }}>
                      No projects have been created yet.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px",
                }}
              >
                {userRole === 'MANAGER' ? (
                  // Display Team Members for Managers with detailed info
                  data.map((member) => (
                    <div
                      key={member._id}
                      style={{
                        background: "#f8fafc",
                        borderRadius: "12px",
                        padding: "24px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        border: "1px solid #e2e8f0",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                      }}
                    >
                      {/* Member Avatar */}
                      <div
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50%",
                          background: "#0ea5e9",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 20px",
                          fontSize: "24px",
                          fontWeight: "bold",
                        }}
                      >
                        {member.name ? member.name.charAt(0).toUpperCase() : 'U'}
                      </div>

                      {/* Member Name */}
                      <h3 style={{ marginBottom: "6px", textAlign: "center", fontSize: "18px" }}>
                        {member.name || 'Unknown'}
                      </h3>

                      {/* Email */}
                      <p style={{ 
                        color: "#64748b", 
                        marginBottom: "12px", 
                        textAlign: "center", 
                        fontSize: "14px",
                        wordBreak: "break-word"
                      }}>
                        {member.email || 'No email'}
                      </p>

                      {/* Role & Designation */}
                      <div style={{ textAlign: "center", marginBottom: "12px" }}>
                        <span
                          style={{
                            background: "#10b981",
                            color: "#fff",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "500",
                            marginRight: "6px",
                            display: "inline-block",
                            marginBottom: "4px"
                          }}
                        >
                          {member.role || 'Employee'}
                        </span>
                        {member.designation && (
                          <span
                            style={{
                              background: "#6366f1",
                              color: "#fff",
                              padding: "6px 14px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "500",
                              display: "inline-block",
                              marginBottom: "4px"
                            }}
                          >
                            {member.designation}
                          </span>
                        )}
                      </div>

                      {/* Tech Stack */}
                      {member.techStack && (
                        <div style={{ textAlign: "center", marginBottom: "12px" }}>
                          <span
                            style={{
                              background: "#f59e0b",
                              color: "#fff",
                              padding: "4px 12px",
                              borderRadius: "16px",
                              fontSize: "11px",
                              fontWeight: "500",
                            }}
                          >
                            🛠️ {member.techStack}
                          </span>
                        </div>
                      )}

                      {/* Status */}
                      <div style={{ textAlign: "center", marginBottom: "12px" }}>
                        <span
                          style={{
                            background: member.isActive ? "#ecfdf5" : "#fef2f2",
                            color: member.isActive ? "#10b981" : "#ef4444",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          {member.isActive ? "✅ Active" : "❌ Inactive"}
                        </span>
                      </div>

                      {/* Divider */}
                      <div style={{
                        height: "1px",
                        background: "#e2e8f0",
                        margin: "16px 0"
                      }}></div>

                      {/* Additional Details */}
                      <div style={{ fontSize: "12px", color: "#64748b" }}>
                        {/* Employee ID */}
                        <div style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontWeight: "500" }}>Employee ID:</span>
                          <span>{member._id ? member._id.slice(-8).toUpperCase() : 'N/A'}</span>
                        </div>

                        {/* Joining Date */}
                        {member.createdAt && (
                          <div style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: "500" }}>Joined:</span>
                            <span>{new Date(member.createdAt).toLocaleDateString()}</span>
                          </div>
                        )}

                        {/* Created By */}
                        {member.createdByRole && (
                          <div style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: "500" }}>Added by:</span>
                            <span>{member.createdByRole}</span>
                          </div>
                        )}

                        {/* Last Updated */}
                        {member.updatedAt && (
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontWeight: "500" }}>Updated:</span>
                            <span>{new Date(member.updatedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  // Display Projects for Admin/HR
                  data.map((project) => (
                    <div
                      key={project._id}
                      style={{
                       background: "#f8fafc",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
    transition: "all 0.2s ease",
    position: "relative" // 👈 important
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                      }}
                    >
                      {/* Project Icon */}
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: "#10b981",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 15px",
                          fontSize: "20px",
                        }}
                      >
                        <FaProjectDiagram />
                      </div>

                      {/* Project Title */}
                      <h3 style={{ marginBottom: "8px", textAlign: "center" }}>
                        {project.title || 'Untitled Project'}
                      </h3>

                      {/* Description */}
                      <p style={{ 
                        color: "#64748b", 
                        marginBottom: "12px", 
                        textAlign: "center", 
                        fontSize: "14px",
                        minHeight: "40px"
                      }}>
                        {project.description || 'No description available'}
                      </p>

                      {/* Team Size */}
                      <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <span
                          style={{
                            background: "#0ea5e9",
                            color: "#fff",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Team: {project.team?.length || 0} members
                        </span>
                      </div>
                      

                      {/* Created Date */}
                      <div style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8" }}>
                        Created: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown'}
                      </div>
                     <button
  onClick={() => openAssignModal(project._id)}
  style={{
    position: "absolute",
    top: "12px",
    right: "12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: "5px",
    borderRadius: "50%"
  }}
  onMouseEnter={(e) => e.currentTarget.style.background = "#eef2ff"}
  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
>
  <FaUserPlus size={22} color="#6366f1" />
</button>
                    </div>
                    
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
     {showModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}
    onClick={() => setShowModal(false)}
  >
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        width: "400px",
        maxWidth: "90%",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 style={{ marginBottom: "16px", textAlign: "center" }}>
        Create Project
      </h3>

      <input
        placeholder="Project Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none"
        }}
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none"
        }}
      />

      <input
        placeholder="Project Manager ID"
        value={formData.projectManager}
        onChange={(e) =>
          setFormData({
            ...formData,
            projectManager: e.target.value
          })
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none"
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={handleCreateProject}
          style={{
            background: "#0ea5e9",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "48%"
          }}
        >
          Create
        </button>

        <button
          onClick={() => setShowModal(false)}
          style={{
            background: "#e5e7eb",
            color: "#111",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "48%"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
{assignModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}
    onClick={() => setAssignModal(false)}
  >
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        width: "400px",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
        Select Team Members
      </h3>

      {employees.length === 0 ? (
        <p style={{ textAlign: "center" }}>No employees found</p>
      ) : (
        employees.map(emp => (
          <div key={emp._id} style={{ marginBottom: "8px" }}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedEmployees([...selectedEmployees, emp._id]);
                } else {
                  setSelectedEmployees(
                    selectedEmployees.filter(id => id !== emp._id)
                  );
                }
              }}
            />
            <span style={{ marginLeft: "8px" }}>{emp.name}</span>
          </div>
        ))
      )}

      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button
          onClick={handleAssignTeam}
          style={{
            flex: 1,
            padding: "10px",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Assign
        </button>

        <button
          onClick={() => setAssignModal(false)}
          style={{
            flex: 1,
            padding: "10px",
            background: "#e5e7eb",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </DashboardLayout>
  );
};

export default ProjectManagers;

