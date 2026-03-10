import React, { useState, useEffect } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { onboardingService } from "../../services/onboardingService";

const EmployeesOnboarding = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // State for API data
  const [onboardingData, setOnboardingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for start onboarding modal
  const [showStartModal, setShowStartModal] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [startError, setStartError] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: ''
  });

  // Fetch onboarding data on component mount
  useEffect(() => {
    fetchOnboardingData();
  }, []);

  const fetchOnboardingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await onboardingService.getOnboarding();
      
      if (response.success) {
        setOnboardingData(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch onboarding data');
      }
    } catch (error) {
      console.error('Fetch onboarding error:', error);
      setError('Failed to fetch onboarding data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle start onboarding
  const handleStartOnboarding = async () => {
    try {
      setStartLoading(true);
      setStartError(null);
      
      const onboardingData = {
        employeeId: formData.employeeId
      };
      
      const response = await onboardingService.startOnboarding(onboardingData);
      
      if (response.success) {
        fetchOnboardingData();
        setFormData({ employeeId: '' });
        setShowStartModal(false);
        alert('Onboarding started successfully!');
      } else {
        setStartError(response.message || 'Failed to start onboarding');
      }
    } catch (error) {
      console.error('Start onboarding error:', error);
      setStartError(error.message || 'Failed to start onboarding. Please try again.');
    } finally {
      setStartLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset start form
  const resetStartForm = () => {
    setFormData({ employeeId: '' });
    setStartError(null);
    setShowStartModal(false);
  };

  // Calculate pagination
  const totalPages = Math.ceil(onboardingData.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = onboardingData.slice(indexOfFirst, indexOfLast);

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f5f6fa", minHeight: "100vh" }}
      >
        {/* Heading */}
        <h2 style={{ marginBottom: "20px" }}>HRMS / Employees Onboarding</h2>

        {/* Top Cards */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {/* Card 1 */}
          <div style={cardStyle}>
            <h4>Digital Onboarding</h4>
            <p style={{ color: "#777", fontSize: "14px" }}>
              Streamline the new hire onboarding process with ease.
            </p>
            <ul style={{ fontSize: "14px", color: "#555" }}>
              <li>Automated onboarding checklists</li>
              <li>Employee document upload & verification</li>
              <li>Welcome emails & training modules</li>
            </ul>
            <button 
              onClick={() => setShowStartModal(true)}
              style={primaryBtn}
            >
              Start Onboarding
            </button>
          </div>

          {/* Card 2 */}
          <div style={cardStyle}>
            <h4>Digital Onboarding</h4>

            <table
              style={{ width: "100%", fontSize: "14px", marginBottom: "10px" }}
            >
              <tbody>
                <tr>
                  <td>Basic Salary</td>
                  <td style={{ textAlign: "right" }}>25,000</td>
                </tr>
                <tr>
                  <td>House Rent Allowance (HRV)</td>
                  <td style={{ textAlign: "right" }}>10,000</td>
                </tr>
                <tr>
                  <td>Provident Fund (PF)</td>
                  <td style={{ textAlign: "right" }}>1,800</td>
                </tr>
              </tbody>
            </table>

            <button style={primaryBtn}>Manage Salary Structure</button>
          </div>
        </div>

        {/* Employee Table */}
        <div style={tableCard}>
          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ 
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #00bcd4',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '10px', color: '#666' }}>Loading onboarding data...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ color: '#e74c3c', marginBottom: '10px' }}>{error}</div>
              <button
                onClick={fetchOnboardingData}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#00bcd4',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Data Table */}
          {!loading && !error && (
            <>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9fb", textAlign: "left" }}>
                    <th style={thStyle}>Onboarding ID</th>
                    <th style={thStyle}>Employee Name</th>
                    <th style={thStyle}>Employee ID</th>
                    <th style={thStyle}>Documents</th>
                    <th style={thStyle}>Training</th>
                    <th style={thStyle}>Welcome Email</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Created Date</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((onboarding, index) => (
                      <tr key={onboarding._id || index}>
                        <td style={tdStyle}>{onboarding._id?.slice(-8).toUpperCase() || 'N/A'}</td>
                        <td style={tdStyle}>
                          {onboarding.employee?.name || onboarding.employeeName || 'N/A'}
                        </td>
                        <td style={tdStyle}>
                          {onboarding.employee?._id?.slice(-6).toUpperCase() || onboarding.employeeId || 'N/A'}
                        </td>
                        <td style={tdStyle}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              backgroundColor: onboarding.documentsUploaded ? "#e8f5e9" : "#fff3cd",
                              color: onboarding.documentsUploaded ? "green" : "#856404"
                            }}
                          >
                            {onboarding.documentsUploaded ? "Uploaded" : "Pending"}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              backgroundColor: onboarding.trainingCompleted ? "#e8f5e9" : "#fff3cd",
                              color: onboarding.trainingCompleted ? "green" : "#856404"
                            }}
                          >
                            {onboarding.trainingCompleted ? "Completed" : "Pending"}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              backgroundColor: onboarding.welcomeEmailSent ? "#e8f5e9" : "#fff3cd",
                              color: onboarding.welcomeEmailSent ? "green" : "#856404"
                            }}
                          >
                            {onboarding.welcomeEmailSent ? "Sent" : "Pending"}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <span
                            style={
                              onboarding.status === "Completed" ? activeBadge : 
                              onboarding.status === "In Progress" ? inProgressBadge : 
                              inactiveBadge
                            }
                          >
                            {onboarding.status || 'Unknown'}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          {onboarding.createdAt ? new Date(onboarding.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td style={tdStyle}>⋯</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ 
                        textAlign: 'center', 
                        padding: '40px', 
                        color: '#666',
                        fontStyle: 'italic'
                      }}>
                        No onboarding records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={paginationContainer}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    style={pageBtn}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      style={{
                        ...pageBtn,
                        background: currentPage === num ? "#00bcd4" : "#fff",
                        color: currentPage === num ? "#fff" : "#000",
                      }}
                    >
                      {num}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={pageBtn}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Start Onboarding Modal */}
        {showStartModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              width: '500px',
              maxWidth: '90%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Start Employee Onboarding</h3>
              
              {startError && (
                <div style={{
                  padding: '10px',
                  backgroundColor: '#fee',
                  border: '1px solid #fcc',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  color: '#c00'
                }}>
                  {startError}
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="Enter employee ID"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <small style={{ color: '#666', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  Enter the MongoDB ObjectId of the employee
                </small>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={resetStartForm}
                  disabled={startLoading}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: startLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: startLoading ? 0.6 : 1
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartOnboarding}
                  disabled={startLoading || !formData.employeeId}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: startLoading ? '#6c757d' : '#00bcd4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: startLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: startLoading ? 0.6 : 1
                  }}
                >
                  {startLoading ? 'Starting...' : 'Start Onboarding'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

/* Styles */

const cardStyle = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const tableCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const primaryBtn = {
  marginTop: "10px",
  padding: "8px 14px",
  borderRadius: "6px",
  border: "none",
  background: "#00bcd4",
  color: "#fff",
  cursor: "pointer",
};

const thStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#666",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
};

const activeBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#e8f5e9",
  color: "green",
  fontSize: "12px",
};

const inactiveBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#ffebee",
  color: "red",
  fontSize: "12px",
};

const inProgressBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#e3f2fd",
  color: "#1976d2",
  fontSize: "12px",
};

const paginationContainer = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "8px",
};

const pageBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

export default EmployeesOnboarding;
