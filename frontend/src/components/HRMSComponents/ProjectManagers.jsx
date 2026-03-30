import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { FaUsers } from "react-icons/fa";

const ProjectManagers = () => {
  const [managers, setManagers] = useState([]);

  // Dummy data (abhi UI ke liye)
  useEffect(() => {
    const dummyData = [
      {
        _id: "1",
        name: "Anurag",
        techStack: "TECH",
        team: ["Rahul", "Priya", "Amit"],
      },
      {
        _id: "2",
        name: "rishita",
        techStack: "AIML",
        team: ["Karan", "Neha"],
      },
    ];
    setManagers(dummyData);
  }, []);

  return (
    <DashboardLayout>
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          <FaUsers style={{ marginRight: "10px" }} />
          Project Managers
        </h2>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {managers.map((pm) => (
            <div
              key={pm._id}
              style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {/* PM Name */}
              <h3 style={{ marginBottom: "8px" }}>{pm.name}</h3>

              {/* Domain */}
              <p style={{ color: "#64748b", marginBottom: "10px" }}>
                Domain: {pm.techStack}
              </p>

              {/* Team Count */}
              <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                Team Members: {pm.team.length}
              </p>

              {/* Team Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {pm.team.map((member, index) => (
                  <span
                    key={index}
                    style={{
                      background: "#0ea5e9",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                    }}
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectManagers;