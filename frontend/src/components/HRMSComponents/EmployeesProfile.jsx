import React from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";

const EmployeeProfile = () => {
  return (
    <DashboardLayout>
      <div style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}>

        {/* Page Heading */}
        <h2 style={{ marginBottom: "20px" }}>
          HRMS / Employees Profile
        </h2>

        {/* Profile Header Card */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                style={{ width: "90px", height: "90px", borderRadius: "50%" }}
              />
              <div>
                <h3 style={{ margin: 0 }}>Rahul Sharma</h3>
                <p style={{ margin: "4px 0", color: "#777" }}>
                  EID : EMP1023 &nbsp; | &nbsp; Software Engineer
                </p>
                <span style={activeBadge}>Active</span>
              </div>
            </div>

            <button style={primaryBtn}>Edit Profile</button>
          </div>
        </div>

        {/* Grid Section */}
        <div style={gridContainer}>

          {/* Basic Information */}
          <div style={card}>
            <h4 style={sectionTitle}>Basic Information</h4>
            <InfoRow label="Full Name" value="Rahul Sharma" />
            <InfoRow label="Email" value="rahul@gmail.com" />
            <InfoRow label="Gender" value="Male" />
            <InfoRow label="Phone" value="+91 9876543210" />
            <InfoRow label="Nationality" value="Indian" />
            <InfoRow label="Joining Date" value="15 Mar 2023" />
          </div>

          {/* Job Details */}
          <div style={card}>
            <h4 style={sectionTitle}>Job & Organization Details</h4>
            <InfoRow label="Employee ID" value="EMP1023" />
            <InfoRow label="Department" value="IT" />
            <InfoRow label="Designation" value="Software Engineer" />
            <InfoRow label="Manager" value="Ankit Patel" />
            <InfoRow label="Work Mode" value="Hybrid" />
            <InfoRow label="Experience" value="3 Years" />
          </div>

          {/* Salary */}
          <div style={card}>
            <h4 style={sectionTitle}>Salary & Payroll Info</h4>
            <InfoRow label="Basic Salary" value="₹25,000" />
            <InfoRow label="Allowances" value="₹10,000" />
            <InfoRow label="PF" value="₹1,800" />
            <InfoRow label="Bank" value="HDFC Bank" />
            <InfoRow label="Account No." value="XXXX3328" />
            <InfoRow label="IFSC Code" value="HDFC0004442" />
          </div>

          {/* Attendance */}
          <div style={card}>
            <h4 style={sectionTitle}>Attendance Summary</h4>
            <InfoRow label="Present Days" value="22" />
            <InfoRow label="Absent Days" value="2" />
            <InfoRow label="Leaves Taken" value="1" />
            <InfoRow label="Attendance %" value="95%" />
          </div>

          {/* Documents */}
          <div style={card}>
            <h4 style={sectionTitle}>Employee Documents</h4>
            <DocumentRow name="Aadhar Card" />
            <DocumentRow name="Resume" />
            <DocumentRow name="Offer Letter" />
          </div>

          {/* Account */}
          <div style={card}>
            <h4 style={sectionTitle}>Account & Access Control</h4>
            <InfoRow label="Username" value="rahul.sharma" />
            <InfoRow label="Role" value="Employee" />
            <InfoRow label="Last Login" value="Today 10:12 AM" />
          </div>

        </div>

        {/* Bottom Buttons */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button style={primaryBtn}>Save Changes</button>
          <button style={secondaryBtn}>Cancel</button>
          <button style={secondaryBtn}>Reset Password</button>
          <button style={dangerBtn}>Delete Employee</button>
        </div>

      </div>
    </DashboardLayout>
  );
};

/* Reusable Components */

const InfoRow = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
    <span style={{ color: "#666", fontSize: "14px" }}>{label}</span>
    <span style={{ fontSize: "14px", fontWeight: "500" }}>{value}</span>
  </div>
);

const DocumentRow = ({ name }) => (
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
    <span>{name}</span>
    <div>
      <span style={{ color: "#00bcd4", cursor: "pointer", marginRight: "10px" }}>View</span>
      <span style={{ color: "#00bcd4", cursor: "pointer" }}>Download</span>
    </div>
  </div>
);

/* Styles */

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px",
  marginTop: "20px"
};

const sectionTitle = {
  marginBottom: "15px"
};

const activeBadge = {
  background: "#e8f5e9",
  color: "green",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px"
};

const primaryBtn = {
  padding: "8px 16px",
  background: "#00bcd4",
  border: "none",
  color: "#fff",
  borderRadius: "6px",
  cursor: "pointer"
};

const secondaryBtn = {
  padding: "8px 16px",
  background: "#f1f1f1",
  border: "1px solid #ddd",
  borderRadius: "6px",
  cursor: "pointer"
};

const dangerBtn = {
  padding: "8px 16px",
  background: "#fff",
  border: "1px solid red",
  color: "red",
  borderRadius: "6px",
  cursor: "pointer"
};

export default EmployeeProfile;