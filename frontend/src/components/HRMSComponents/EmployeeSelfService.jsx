import React, { useState, useEffect } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { requestService } from "../../services/requestService";
import { leaveService } from "../../services/leaveService";
import { attendanceService } from "../../services/attendanceService";
import { payrollService } from "../../services/payrollService";

const EmployeeSelfService = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // State for API data
  const [myRequests, setMyRequests] = useState([]);
  const [myLeaves, setMyLeaves] = useState([]);
  const [myPayroll, setMyPayroll] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  
  // Form states
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Sick',
    fromDate: '',
    toDate: '',
    reason: ''
  });
  
  const [requestForm, setRequestForm] = useState({
    type: 'General',
    subject: '',
    description: '',
    priority: 'Medium'
  });

  // Fetch all employee data on component mount
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [requests, leaves, payroll] = await Promise.all([
        requestService.getMyRequests(),
        leaveService.getMyLeaves(),
        payrollService.getMyPayroll()
      ]);
      
      setMyRequests(requests.data || []);
      setMyLeaves(leaves.data || []);
      setMyPayroll(payroll.data || []);
      
    } catch (error) {
      console.error('Error fetching employee data:', error);
      alert('Failed to fetch employee data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Action handlers
  const handleApplyLeave = async () => {
    try {
      const leaveData = {
        leaveType: leaveForm.leaveType,
        fromDate: leaveForm.fromDate,
        toDate: leaveForm.toDate,
        reason: leaveForm.reason
      };
      
      await leaveService.applyLeave(leaveData);
      setLeaveForm({ leaveType: 'Sick', fromDate: '', toDate: '', reason: '' });
      setShowLeaveModal(false);
      fetchEmployeeData(); // Refresh data
      alert('Leave applied successfully!');
    } catch (error) {
      alert(error.message || 'Failed to apply leave');
    }
  };

  const handleRaiseRequest = async () => {
    try {
      const requestData = {
        type: requestForm.type,
        subject: requestForm.subject,
        description: requestForm.description,
        priority: requestForm.priority
      };
      
      await requestService.raiseRequest(requestData);
      setRequestForm({ type: 'General', subject: '', description: '', priority: 'Medium' });
      setShowRequestModal(false);
      fetchEmployeeData(); // Refresh data
      alert('Request raised successfully!');
    } catch (error) {
      alert(error.message || 'Failed to raise request');
    }
  };

  const handlePunchIn = async () => {
    try {
      await attendanceService.punchIn();
      alert('Punched in successfully!');
      fetchEmployeeData(); // Refresh data
    } catch (error) {
      alert(error.message || 'Failed to punch in');
    }
  };

  const handlePunchOut = async () => {
    try {
      await attendanceService.punchOut();
      alert('Punched out successfully!');
      fetchEmployeeData(); // Refresh data
    } catch (error) {
      alert(error.message || 'Failed to punch out');
    }
  };

  const handleDownloadPayslip = async (payrollId) => {
    try {
      const response = await payrollService.downloadPayslip(payrollId);
      
      // Create blob URL and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `payslip-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert('Payslip downloaded successfully!');
    } catch (error) {
      alert(error.message || 'Failed to download payslip');
    }
  };

  // Calculate pagination based on requests data
  const totalPages = Math.ceil(myRequests.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = myRequests.slice(indexOfFirst, indexOfLast);

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}
      >
        <h2 style={{ marginBottom: "20px" }}>HRMS / Employee Self-Service</h2>

        {/* Top Section */}
        <div style={topGrid}>
          {/* Left Cards */}
          <div style={{ display: "flex", gap: "20px" }}>
            <StatCard title="Outstanding" value={myLeaves.filter(l => l.status === 'Pending').length} growth="+5.8% this week" />
            <StatCard title="Under Review" value={myRequests.filter(r => r.status === 'Under Review').length} growth="+4% this week" />
          </div>

          {/* Auto Payroll Card */}
          <div style={card}>
            <h4 style={{ marginBottom: "15px" }}>Auto Payroll Processing</h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={() => setShowLeaveModal(true)} style={actionBtn}>
                Apply Leave
              </button>
              <button onClick={handlePunchIn} style={actionBtn}>
                Punch In
              </button>
              <button onClick={handlePunchOut} style={actionBtn}>
                Punch Out
              </button>
              <button 
                onClick={() => myPayroll.length > 0 && handleDownloadPayslip(myPayroll[0]._id)} 
                style={actionBtn}
                disabled={myPayroll.length === 0}
              >
                Download Payslip
              </button>
              <button onClick={() => setShowRequestModal(true)} style={actionBtn}>
                Raise Request
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
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
                <th style={th}>Request ID</th>
                <th style={th}>Type</th>
                <th style={th}>Subject</th>
                <th style={th}>Date</th>
                <th style={th}>Priority</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                    Loading requests...
                  </td>
                </tr>
              ) : currentRows.length > 0 ? (
                currentRows.map((request, index) => (
                  <tr key={request._id || index}>
                    <td style={td}>{request._id?.slice(-6).toUpperCase() || 'N/A'}</td>
                    <td style={td}>{request.type || 'N/A'}</td>
                    <td style={td}>{request.subject || 'N/A'}</td>
                    <td style={td}>{request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td style={td}>
                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        backgroundColor: 
                          request.priority === 'High' ? '#ffebee' :
                          request.priority === 'Medium' ? '#fff3cd' : '#e8f5e9',
                        color: 
                          request.priority === 'High' ? '#ef4444' :
                          request.priority === 'Medium' ? '#856404' : '#10b981'
                      }}>
                        {request.priority || 'N/A'}
                      </span>
                    </td>
                    <td style={td}>
                      <span style={getStatusStyle(request.status)}>
                        {request.status || 'Unknown'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#666', fontStyle: 'italic' }}>
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={pagination}>
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
        </div>

        {/* Apply Leave Modal */}
        {showLeaveModal && (
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
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Apply Leave</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Leave Type
                </label>
                <select
                  name="leaveType"
                  value={leaveForm.leaveType}
                  onChange={(e) => setLeaveForm(prev => ({ ...prev, leaveType: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="Sick">Sick Leave</option>
                  <option value="Casual">Casual Leave</option>
                  <option value="Earned">Earned Leave</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  From Date
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={leaveForm.fromDate}
                  onChange={(e) => setLeaveForm(prev => ({ ...prev, fromDate: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  To Date
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={leaveForm.toDate}
                  onChange={(e) => setLeaveForm(prev => ({ ...prev, toDate: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Reason
                </label>
                <textarea
                  name="reason"
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Enter reason for leave"
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowLeaveModal(false);
                    setLeaveForm({ leaveType: 'Sick', fromDate: '', toDate: '', reason: '' });
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyLeave}
                  disabled={!leaveForm.fromDate || !leaveForm.toDate || !leaveForm.reason}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#00bcd4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    opacity: (!leaveForm.fromDate || !leaveForm.toDate || !leaveForm.reason) ? 0.6 : 1
                  }}
                >
                  Apply Leave
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Raise Request Modal */}
        {showRequestModal && (
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
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Raise Request</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Request Type
                </label>
                <select
                  name="type"
                  value={requestForm.type}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, type: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="General">General Request</option>
                  <option value="Technical">Technical Issue</option>
                  <option value="HR">HR Related</option>
                  <option value="Facility">Facility Request</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={requestForm.subject}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter request subject"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Priority
                </label>
                <select
                  name="priority"
                  value={requestForm.priority}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, priority: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={requestForm.description}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter detailed description"
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowRequestModal(false);
                    setRequestForm({ type: 'General', subject: '', description: '', priority: 'Medium' });
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRaiseRequest}
                  disabled={!requestForm.subject || !requestForm.description}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#00bcd4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    opacity: (!requestForm.subject || !requestForm.description) ? 0.6 : 1
                  }}
                >
                  Raise Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

/* Components */

const StatCard = ({ title, value, growth }) => (
  <div style={card}>
    <p style={{ fontSize: "14px", color: "#666" }}>{title}</p>
    <h3 style={{ margin: "5px 0" }}>{value}</h3>
    <p style={{ fontSize: "12px", color: "#28a745" }}>{growth}</p>
  </div>
);

/* Styles */

const topGrid = {
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

const actionBtn = {
  padding: "8px 12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#f8f9fb",
  cursor: "pointer",
  fontSize: "12px",
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

const pagination = {
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

const getStatusStyle = (status) => {
  if (status === "Approved")
    return {
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

  if (status === "Under View")
    return {
      padding: "4px 10px",
      background: "#e3f2fd",
      color: "#0d6efd",
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

export default EmployeeSelfService;
