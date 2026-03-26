import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdAssignmentInd, MdReceiptLong } from "react-icons/md";
import DashboardLayout from "./DashboardComponents/DashboardLayout";
import { userService } from "../services/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userService.getAll();
      setUsers(res.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // onboarding
  const handleOnboarding = (user) => {
    alert(`Onboarding for ${user.name}`);
    // example:
    // navigate(`/onboarding/${user._id}`);
  };

  // salary slip
  const handleSalarySlip = (user) => {
    alert(`Salary Slip for ${user.name}`);
    // example:
    // window.open(`/salary-slip/${user._id}`);
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>User List</h2>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  setShowDetailModal(true);
                }}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  transition: "0.3s",
                  textAlign: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "#e0f2fe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                  }}
                >
                  <FaUser size={26} color="#0ea5e9" />
                </div>

                <h3 style={{ margin: "5px 0" }}>{user.name}</h3>

                <p style={{ color: "#64748b" }}>{user.role}</p>

                <span
                  style={{
                    display: "inline-block",
                    marginTop: "8px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    background: user.isActive ? "#ecfdf5" : "#fef2f2",
                    color: user.isActive ? "#10b981" : "#ef4444",
                  }}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))
          )}
        </div>

        {/* DETAIL MODAL */}
        {showDetailModal && selectedUser && (
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
    padding: "30px",
    borderRadius: "16px",
    width: "500px",           
    maxWidth: "90%",          
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  }}
            >
             <h2
  style={{
    marginBottom: "15px",
    color: "#1e293b",
    fontSize: "22px",
    fontWeight: "600",
  }}
>
  {selectedUser.name}
</h2>

<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
  <p style={{ margin: 0 }}>
    <span style={{ fontWeight: "600", color: "#475569" }}>Email:</span>{" "}
    <span style={{ color: "#0f172a" }}>{selectedUser.email}</span>
  </p>

  <p style={{ margin: 0 }}>
    <span style={{ fontWeight: "600", color: "#475569" }}>Role:</span>{" "}
    <span style={{ color: "#0f172a" }}>{selectedUser.role}</span>
  </p>

  <p style={{ margin: 0 }}>
    <span style={{ fontWeight: "600", color: "#475569" }}>
      Designation:
    </span>{" "}
    <span style={{ color: "#0f172a" }}>
      {selectedUser.designation || "-"}
    </span>
  </p>

  <p style={{ margin: 0 }}>
    <span style={{ fontWeight: "600", color: "#475569" }}>
      Tech Stack:
    </span>{" "}
    <span style={{ color: "#0f172a" }}>
      {selectedUser.techStack || "-"}
    </span>
  </p>

  <p style={{ margin: 0 }}>
    <span style={{ fontWeight: "600", color: "#475569" }}>Status:</span>{" "}
    <span
      style={{
        color: selectedUser.isActive ? "#10b981" : "#ef4444",
        fontWeight: "500",
      }}
    >
      {selectedUser.isActive ? "Active" : "Inactive"}
    </span>
  </p>
</div>

              {/* Buttons */}
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                {/* Onboarding */}
                <button
                  onClick={() => handleOnboarding(selectedUser)}
                  style={{
                    background: "#10b981",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <MdAssignmentInd /> Onboarding
                </button>

                {/* Salary Slip */}
                <button
                  onClick={() => handleSalarySlip(selectedUser)}
                  style={{
                    background: "#6366f1",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <MdReceiptLong /> Salary Slip
                </button>

                {/* Close */}
                <button
                  onClick={() => setShowDetailModal(false)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserList;