import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { userService } from "../../services/userService";
import profileImg from "../../assets/profileimg.png"
const EmployeeProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.id;
  const navigate = useNavigate();

  // State management
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch employee profile on component mount
  useEffect(() => {
    fetchEmployeeProfile();
  }, [id]);

  const fetchEmployeeProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await userService.getProfile(id);

      if (response.success) {
        setProfileData(response.profile);
      } else {
        setError(response.message || "Failed to fetch employee profile");
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
      setError("Failed to fetch employee profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleEditSubmit = async () => {
  try {
    setLoading(true);

    console.log("Sending Data:", formData);

    const res = await userService.updateProfile(id, formData);

    console.log("Response:", res);

    if (res.success) {
      setProfileData((prev) => ({
        ...prev,
        basicInfo: res.profile || res.data,
      }));

      setShowEditModal(false);
      alert("Profile updated successfully!");
    } else {
      alert(res.message || "Failed to update profile");
    }
  } catch (error) {
    console.error("Update profile error:", error);
    alert("Update failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleUpdateProfile = async (updatedData) => {
    try {
      setLoading(true);
      const response = await userService.updateProfile(id, updatedData);

      if (res.success) {
  setProfileData({
    ...profileData,
    basicInfo: res.profile || res.data
  });
  setShowEditModal(false);
} else {
        alert(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this employee? This action cannot be undone.",
      )
    ) {
      try {
        const response = await userService.delete(id);

        if (response.success) {
          alert("Employee deleted successfully!");
          navigate("/hrm/employees"); // Redirect to employees list
        } else {
          alert(response.message || "Failed to delete employee");
        }
      } catch (error) {
        console.error("Delete employee error:", error);
        alert("Failed to delete employee. Please try again.");
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div
          style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}
        >
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #00bcd4",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            ></div>
            <p style={{ marginTop: "10px", color: "#666" }}>
              Loading employee profile...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout>
      
        <div
          style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}
        >
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ color: "#e74c3c", marginBottom: "10px" }}>
              {error}
            </div>
            <button
              onClick={fetchEmployeeProfile}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                background: "#00bcd4",
                color: "white",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Extract data from profile response
  const { basicInfo, attendanceSummary, payrollInfo } = profileData || {};

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}
      >
        {/* Page Heading */}
        <h2 style={{ marginBottom: "20px" }}>HRMS / Employee Profile</h2>

        {/* Profile Header Card */}
        <div style={card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* <img
                src={`https://i.pravatar.cc/100?u=${basicInfo?._id}`}
                alt="profile"
                style={{ width: "90px", height: "90px", borderRadius: "50%" }}
              /> */}
              <img
  src={basicInfo?.profileImage || profileImg}
  alt="profile"
  style={{
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover"
  }}
/>
              <div>
                <h3 style={{ margin: 0 }}>{basicInfo?.name || "N/A"}</h3>
                <p style={{ margin: "4px 0", color: "#777" }}>
                  EID : {basicInfo?._id?.slice(-6).toUpperCase() || "N/A"}{" "}
                  &nbsp; | &nbsp; {basicInfo?.role || "N/A"}
                </p>
                <span style={basicInfo?.isActive ? activeBadge : inactiveBadge}>
                  {basicInfo?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
  setFormData({ ...basicInfo }); // important change
  setShowEditModal(true);
}}
              style={primaryBtn}
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Grid Section */}
        <div style={gridContainer}>
          {/* Basic Information */}
          <div style={card}>
            <h4 style={sectionTitle}>Basic Information</h4>
            <InfoRow label="Full Name" value={basicInfo?.name || "N/A"} />
            <InfoRow label="Email" value={basicInfo?.email || "N/A"} />
            <InfoRow label="Phone" value={basicInfo?.phone || "N/A"} />
            <InfoRow
              label="Department"
              value={basicInfo?.department || "N/A"}
            />
            <InfoRow
              label="Joining Date"
              value={
                basicInfo?.createdAt
                  ? new Date(basicInfo.createdAt).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>

          {/* Job Details */}
          <div style={card}>
            <h4 style={sectionTitle}>Job & Organization Details</h4>
            <InfoRow
              label="Employee ID"
              value={basicInfo?._id?.slice(-6).toUpperCase() || "N/A"}
            />
            <InfoRow label="Role" value={basicInfo?.role || "N/A"} />
            <InfoRow
              label="Department"
              value={basicInfo?.department || "N/A"}
            />
             <InfoRow
  label="Project Manager"
  value={basicInfo?.projectManager || "N/A"}
/>
            <InfoRow
              label="Status"
              value={basicInfo?.isActive ? "Active" : "Inactive"}
            />
            <InfoRow
              label="Created"
              value={
                basicInfo?.createdAt
                  ? new Date(basicInfo.createdAt).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>

          {/* Attendance Summary */}
          <div style={card}>
            <h4 style={sectionTitle}>Attendance Summary</h4>
            <InfoRow
              label="Present Days"
              value={attendanceSummary?.presentDays || 0}
            />
            <InfoRow
              label="Leaves Taken"
              value={attendanceSummary?.leavesTaken || 0}
            />
            <InfoRow
              label="Attendance %"
              value={
                attendanceSummary
                  ? Math.round(
                      (attendanceSummary.presentDays /
                        (attendanceSummary.presentDays +
                          attendanceSummary.leavesTaken)) *
                        100,
                    ) || 0
                  : 0
              }
            />
          </div>

          {/* Account */}
          <div style={card}>
            <h4 style={sectionTitle}>Account & Access Control</h4>
            <InfoRow
              label="Username"
              value={basicInfo?.email?.split("@")[0] || "N/A"}
            />
            <InfoRow label="Role" value={basicInfo?.role || "N/A"} />
            <InfoRow
              label="Status"
              value={basicInfo?.isActive ? "Active" : "Inactive"}
            />
            <InfoRow
              label="Last Updated"
              value={
                basicInfo?.updatedAt
                  ? new Date(basicInfo.updatedAt).toLocaleDateString()
                  : "N/A"
              }
            />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => handleUpdateProfile(basicInfo)}
            disabled={!editing}
            style={{
              ...primaryBtn,
              opacity: editing ? 1 : 0.5,
              cursor: editing ? "pointer" : "not-allowed",
            }}
          >
            Save Changes
          </button>
          <button onClick={() => setEditing(false)} style={secondaryBtn}>
            Cancel
          </button>
          <button style={secondaryBtn}>Reset Password</button>
          <button onClick={handleDeleteEmployee} style={dangerBtn}>
            Delete Employee
          </button>
        </div>
      </div>
      {showEditModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        width: "500px",
        maxWidth: "90%",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>Edit Profile</h3>

      <input
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Full Name"
        style={inputStyle}
      />

      <input
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="Email"
        style={inputStyle}
      />

      <input
        name="phone"
        value={formData.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        style={inputStyle}
      />

      <input
        name="department"
        value={formData.department || ""}
        onChange={handleChange}
        placeholder="Department"
        style={inputStyle}
      />

      {/* Buttons */}
      <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
        <button onClick={handleEditSubmit} style={primaryBtn} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          onClick={() => setShowEditModal(false)}
          style={secondaryBtn}
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

/* Reusable Components */

const InfoRow = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
    }}
  >
    <span style={{ color: "#666", fontSize: "14px" }}>{label}</span>
    <span style={{ fontSize: "14px", fontWeight: "500" }}>{value}</span>
  </div>
);

const DocumentRow = ({ name }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
    }}
  >
    <span>{name}</span>
    <div>
      <span
        style={{ color: "#00bcd4", cursor: "pointer", marginRight: "10px" }}
      >
        View
      </span>
      <span style={{ color: "#00bcd4", cursor: "pointer" }}>Download</span>
    </div>
  </div>
);

/* Styles */

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const sectionTitle = {
  marginBottom: "15px",
};

const activeBadge = {
  background: "#e8f5e9",
  color: "green",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const inactiveBadge = {
  background: "#ffebee",
  color: "red",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const primaryBtn = {
  padding: "8px 16px",
  background: "#00bcd4",
  border: "none",
  color: "#fff",
  borderRadius: "6px",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "8px 16px",
  background: "#f1f1f1",
  border: "1px solid #ddd",
  borderRadius: "6px",
  cursor: "pointer",
};

const dangerBtn = {
  padding: "8px 16px",
  background: "#fff",
  border: "1px solid red",
  color: "red",
  borderRadius: "6px",
  cursor: "pointer",
};
const inputStyle = { 
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default EmployeeProfile;

