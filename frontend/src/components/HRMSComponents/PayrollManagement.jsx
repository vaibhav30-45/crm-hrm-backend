import React, { useState, useEffect } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { payrollService } from "../../services/payrollService";

const PayrollManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // State for API data
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRunPayrollModal, setShowRunPayrollModal] = useState(false);
  const [runningPayroll, setRunningPayroll] = useState(false);
  const [markingPaid, setMarkingPaid] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form state for run payroll
  const [newPayroll, setNewPayroll] = useState({
    employeeId: '',
    baseSalary: '',
    deductions: '',
    month: ''
  });

  // Fetch all payroll records
  const fetchAllPayroll = async () => {
    try {
      setLoading(true);
      const response = await payrollService.getAllPayroll();
      setPayrollData(response || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching payroll:', error);
      setError(error?.message || 'Failed to fetch payroll data');
      setPayrollData([]);
    } finally {
      setLoading(false);
    }
  };

  // Run payroll
  const handleRunPayroll = async () => {
    try {
      setRunningPayroll(true);
      
      const response = await payrollService.runPayroll(newPayroll);
      
      if (response) {
        // Show success popup
        setSuccessMessage('Payroll processed successfully!');
        setShowSuccessPopup(true);
        
        // Reset form and close modal
        setShowRunPayrollModal(false);
        setNewPayroll({
          employeeId: '',
          baseSalary: '',
          deductions: '',
          month: ''
        });
        
        // Refresh data
        await fetchAllPayroll();
      } else {
        alert('Failed to process payroll');
      }
    } catch (error) {
      console.error('Error running payroll:', error);
      alert('Failed to process payroll. Please try again.');
    } finally {
      setRunningPayroll(false);
    }
  };

  // Mark as paid
  const handleMarkPaid = async (payrollId) => {
    try {
      setMarkingPaid(prev => ({ ...prev, [payrollId]: true }));
      
      const response = await payrollService.markPaid(payrollId);
      
      if (response) {
        // Show success popup
        setSuccessMessage('Payroll marked as paid successfully!');
        setShowSuccessPopup(true);
        
        // Refresh data
        await fetchAllPayroll();
      } else {
        alert('Failed to mark as paid');
      }
    } catch (error) {
      console.error('Error marking as paid:', error);
      alert('Failed to mark as paid. Please try again.');
    } finally {
      setMarkingPaid(prev => ({ ...prev, [payrollId]: false }));
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    const total = payrollData.length;
    const disbursed = payrollData.filter(p => p.status === 'Paid').length;
    const pending = payrollData.filter(p => p.status === 'Pending').length;
    
    return { total, disbursed, pending };
  };

  const stats = calculateStats();

  // Fetch data on component mount
  useEffect(() => {
    fetchAllPayroll();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(payrollData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = payrollData.slice(indexOfFirst, indexOfLast);

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}
      >
        <h2 style={{ marginBottom: "20px" }}>HRMS / Payroll Management</h2>

        {/* Top Stats */}
        <div style={statsGrid}>
          <StatCard
            title="Total Payroll"
            value={stats.total}
            growth="+6.6% last month"
          />
          <StatCard title="Disbursed" value={stats.disbursed} growth="+5.5% last month" />
          <StatCard
            title="Pending"
            value={stats.pending}
            growth="+4.3% last month"
          />
        </div>

        {/* Middle Section */}
        <div style={middleGrid}>
          {/* Left */}
          <div>
            <div style={card}>
              <h4>Auto Payroll Processing</h4>
              <ul style={{ fontSize: "14px", color: "#666" }}>
                <li>Automatic salary calculation & processing</li>
                <li>Tax deductions, PF, ESI calculations</li>
                <li>Generate & distribute payslips</li>
              </ul>
              <button 
                onClick={() => setShowRunPayrollModal(true)}
                style={primaryBtn}
              >
                Run Payroll
              </button>
            </div>

            <div style={{ ...card, marginTop: "20px" }}>
              <h4>AI Anomaly Detection</h4>
              <p style={{ fontSize: "14px", color: "#666" }}>
                AI-powered system to detect payroll fraud and mistakes.
              </p>
              <p style={{ fontSize: "14px", color: "red" }}>
                Suspected Fraud: 0 detected this month
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>
                Payroll Mistakes: 0 detected this month
              </p>
            </div>
          </div>

          {/* Right */}
          <div style={card}>
            <h4>Anomalies detected</h4>

            <table
              style={{
                width: "100%",
                fontSize: "14px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#f1f3f6" }}>
                  <th style={th}>Employee</th>
                  <th style={th}>Type</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>--</td>
                  <td style={td}>Suspected Fraud</td>
                  <td style={td}>
                    <span style={reviewBtn}>Review</span>
                  </td>
                </tr>
                <tr>
                  <td style={td}>--</td>
                  <td style={td}>Payroll Mistakes</td>
                  <td style={td}>
                    <span style={reviewBtn}>Review</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payroll Table */}
        <div style={{ ...card, marginTop: "20px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ background: "#f1f3f6" }}>
                <th style={th}>Employee ID</th>
                <th style={th}>Name</th>
                <th style={th}>Base Salary</th>
                <th style={th}>Deductions</th>
                <th style={th}>Net Salary</th>
                <th style={th}>Month</th>
                <th style={th}>Status</th>
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ 
                    padding: "20px", 
                    textAlign: "center", 
                    color: "#666"
                  }}>
                    Loading payroll data...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" style={{ 
                    padding: "20px", 
                    textAlign: "center", 
                    color: "red"
                  }}>
                    {error}
                  </td>
                </tr>
              ) : payrollData.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ 
                    padding: "20px", 
                    textAlign: "center", 
                    color: "#666"
                  }}>
                    No payroll records found
                  </td>
                </tr>
              ) : (
                currentData.map((payroll, index) => (
                  <tr key={payroll._id || index}>
                    <td style={td}>{payroll.employee?._id || 'N/A'}</td>
                    <td style={td}>{payroll.employee?.name || 'Unknown'}</td>
                    <td style={td}>₹{payroll.baseSalary?.toLocaleString() || '0'}</td>
                    <td style={td}>₹{payroll.deductions?.toLocaleString() || '0'}</td>
                    <td style={td}>₹{payroll.netSalary?.toLocaleString() || '0'}</td>
                    <td style={td}>{payroll.month || 'N/A'}</td>
                    <td style={td}>
                      <span style={getStatusStyle(payroll.status)}>
                        {payroll.status}
                      </span>
                    </td>
                    <td style={td}>
                      {payroll.status === 'Pending' && (
                        <button
                          onClick={() => handleMarkPaid(payroll._id)}
                          disabled={markingPaid[payroll._id]}
                          style={{
                            padding: "4px 8px",
                            background: markingPaid[payroll._id] ? "#ccc" : "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: markingPaid[payroll._id] ? "not-allowed" : "pointer",
                            fontSize: "12px"
                          }}
                        >
                          {markingPaid[payroll._id] ? '...' : 'Mark Paid'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Working Pagination */}
          <div style={pagination}>
            <button
              style={{ ...pageBtn, opacity: currentPage === 1 ? 0.5 : 1 }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  ...pageBtn,
                  background: currentPage === index + 1 ? "#00bcd4" : "#fff",
                  color: currentPage === index + 1 ? "#fff" : "#000",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              style={{
                ...pageBtn,
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Run Payroll Modal */}
      {showRunPayrollModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            width: "500px",
            maxWidth: "90%"
          }}>
            <h3 style={{ marginBottom: "20px" }}>Run Payroll</h3>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Employee ID</label>
              <input
                type="text"
                value={newPayroll.employeeId}
                onChange={(e) => setNewPayroll({ ...newPayroll, employeeId: e.target.value })}
                placeholder="Enter employee ID"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px"
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Base Salary</label>
              <input
                type="number"
                value={newPayroll.baseSalary}
                onChange={(e) => setNewPayroll({ ...newPayroll, baseSalary: e.target.value })}
                placeholder="Enter base salary"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px"
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Deductions</label>
              <input
                type="number"
                value={newPayroll.deductions}
                onChange={(e) => setNewPayroll({ ...newPayroll, deductions: e.target.value })}
                placeholder="Enter deductions"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Month</label>
              <input
                type="text"
                value={newPayroll.month}
                onChange={(e) => setNewPayroll({ ...newPayroll, month: e.target.value })}
                placeholder="e.g., February 2026"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px"
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => {
                  setShowRunPayrollModal(false);
                  setNewPayroll({
                    employeeId: '',
                    baseSalary: '',
                    deductions: '',
                    month: ''
                  });
                }}
                style={{
                  padding: "8px 16px",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRunPayroll}
                disabled={!newPayroll.employeeId || !newPayroll.baseSalary || !newPayroll.deductions || !newPayroll.month || runningPayroll}
                style={{
                  padding: "8px 16px",
                  background: (!newPayroll.employeeId || !newPayroll.baseSalary || !newPayroll.deductions || !newPayroll.month || runningPayroll) ? "#ccc" : "#00bcd4",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: (!newPayroll.employeeId || !newPayroll.baseSalary || !newPayroll.deductions || !newPayroll.month || runningPayroll) ? "not-allowed" : "pointer"
                }}
              >
                {runningPayroll ? 'Processing...' : 'Run Payroll'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000"
          }}
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              maxWidth: "400px",
              width: "90%"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "#e8f5e9",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 20px"
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="green"
                strokeWidth="2"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 style={{ margin: "0 0 10px", color: "#333" }}>
              Success!
            </h3>
            
            <p style={{ margin: "0 0 20px", color: "#666", fontSize: "14px" }}>
              {successMessage}
            </p>
            
            <button
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px"
              }}
              onClick={() => setShowSuccessPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

/* Components */

const StatCard = ({ title, value, growth }) => (
  <div style={card}>
    <p style={{ fontSize: "14px", color: "#666" }}>{title}</p>
    <h3 style={{ margin: "5px 0" }}>{value}</h3>
    <p style={{ fontSize: "12px", color: "green" }}>{growth}</p>
  </div>
);

/* Styles */

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "20px",
};

const middleGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const primaryBtn = {
  marginTop: "10px",
  padding: "8px 14px",
  background: "#00bcd4",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
};

const th = {
  padding: "10px",
  textAlign: "left",
  color: "#666",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const reviewBtn = {
  padding: "4px 10px",
  background: "#e8f5e9",
  color: "green",
  borderRadius: "20px",
  fontSize: "12px",
  cursor: "pointer",
};

const getStatusStyle = (status) => {
  if (status === "Paid") return { 
    padding: "4px 10px",
    background: "#e8f5e9",
    color: "green",
    borderRadius: "20px",
    fontSize: "12px",
  };
  if (status === "Pending")
    return { 
      padding: "4px 10px",
      background: "#fff3cd",
      color: "#856404",
      borderRadius: "20px",
      fontSize: "12px",
    };
  return { 
    padding: "4px 10px",
    background: "#ffebee",
    color: "red",
    borderRadius: "20px",
    fontSize: "12px",
  };
};

const pagination = {
  marginTop: "15px",
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

export default PayrollManagement;
