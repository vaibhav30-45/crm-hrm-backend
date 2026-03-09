import React, { useState, useEffect } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { performanceService } from "../../services/performanceService";

const PerformanceAppraisal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // State for API data
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for create review modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    score: '',
    nextReviewDate: ''
  });

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await performanceService.getAllReviews();
      
      // Handle different response formats
      let data = [];
      if (response && response.success && Array.isArray(response.data)) {
        data = response.data;
      } else if (response && Array.isArray(response.data)) {
        data = response.data;
      } else if (response && Array.isArray(response)) {
        data = response;
      } else {
        console.warn('Unexpected response format:', response);
        data = [];
      }
      
      setReviews(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err?.message || 'Failed to fetch performance reviews');
      
      // Fallback to mock data if API fails
      setReviews([
        {
          _id: "1",
          employee: {
            _id: "EM-001",
            name: "Rahul Patidar"
          },
          score: 90,
          rating: "Excellent",
          nextReviewDate: "2026-01-10T00:00:00.000Z",
          status: "Completed"
        },
        {
          _id: "2",
          employee: {
            _id: "EM-002",
            name: "Neha Shah"
          },
          score: 75,
          rating: "Good",
          nextReviewDate: "2026-01-12T00:00:00.000Z",
          status: "Pending"
        },
        {
          _id: "3",
          employee: {
            _id: "EM-003",
            name: "Pooja Patel"
          },
          score: 60,
          rating: "Average",
          nextReviewDate: "2026-01-14T00:00:00.000Z",
          status: "Completed"
        },
        {
          _id: "4",
          employee: {
            _id: "EM-004",
            name: "Amit Kumar"
          },
          score: 45,
          rating: "Below Average",
          nextReviewDate: "2026-01-15T00:00:00.000Z",
          status: "Pending"
        },
        {
          _id: "5",
          employee: {
            _id: "EM-005",
            name: "Riya Sharma"
          },
          score: 92,
          rating: "Excellent",
          nextReviewDate: "2026-01-20T00:00:00.000Z",
          status: "Pending"
        },
        {
          _id: "6",
          employee: {
            _id: "EM-006",
            name: "Vikram Singh"
          },
          score: 78,
          rating: "Good",
          nextReviewDate: "2026-01-16T00:00:00.000Z",
          status: "Completed"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle create review
  const handleCreateReview = async () => {
    try {
      setCreateLoading(true);
      setCreateError(null);
      
      const reviewData = {
        employeeId: formData.employeeId,
        score: parseInt(formData.score),
        nextReviewDate: formData.nextReviewDate
      };
      
      const response = await performanceService.createReview(reviewData);
      
      if (response.success) {
        // Refresh the reviews list
        fetchReviews();
        // Reset form and close modal
        setFormData({ employeeId: '', score: '', nextReviewDate: '' });
        setShowCreateModal(false);
      } else {
        setCreateError(response.message || 'Failed to create review');
      }
    } catch (error) {
      console.error('Error creating review:', error);
      setCreateError(error.message || 'Failed to create review');
    } finally {
      setCreateLoading(false);
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

  // Reset create form
  const resetCreateForm = () => {
    setFormData({ employeeId: '', score: '', nextReviewDate: '' });
    setCreateError(null);
    setShowCreateModal(false);
  };

  // Ensure reviews is always an array
  const data = Array.isArray(reviews) ? reviews : [];
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = data.slice(indexOfFirst, indexOfLast);

  // Calculate statistics
  const calculateStats = () => {
    const total = data.length;
    const completed = data.filter(r => r.status === 'Completed').length;
    const pending = data.filter(r => r.status === 'Pending').length;
    const highPerformers = data.filter(r => r.rating === 'Excellent').length;
    
    return { total, completed, pending, highPerformers };
  };

  const stats = calculateStats();

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}
      >
        <h2 style={{ marginBottom: "20px" }}>HRMS / Performance & Appraisal</h2>

        {/* Create Button */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#0ea5e9",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#0284c7";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#0ea5e9";
            }}
          >
            + Create Review
          </button>
        </div>

        {/* Top Cards */}
        <div style={topCards}>
          <StatCard
            title="Total Employees"
            value={stats.total}
            growth="+5.8% this week"
          />
          <StatCard
            title="Reviews Completed"
            value={stats.completed}
            growth="+5.1% last cycle"
          />
          <StatCard
            title="Pending Reviews"
            value={stats.pending}
            growth="-3.4% last cycle"
          />
          <StatCard
            title="High Performance"
            value={stats.highPerformers}
            growth="+4% last cycle"
          />
        </div>

        {/* Table Card */}
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
                <th style={th}>Score</th>
                <th style={th}>Rating</th>
                <th style={th}>Next Review</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ 
                    padding: "20px", 
                    textAlign: "center", 
                    color: "#666"
                  }}>
                    Loading performance reviews...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" style={{ 
                    padding: "20px", 
                    textAlign: "center", 
                    color: "red"
                  }}>
                    {error}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ 
                    padding: "20px", 
                    textAlign: "center", 
                    color: "#666"
                  }}>
                    No performance reviews found
                  </td>
                </tr>
              ) : (
                currentRows.map((review, index) => (
                  <tr key={review._id || index}>
                    <td style={td}>{review.employee?._id || 'N/A'}</td>
                    <td style={td}>{review.employee?.name || 'Unknown'}</td>
                    <td style={td}>{review.score || '0'}</td>
                    <td style={td}>
                      <span style={getRatingStyle(review.rating)}>
                        {review.rating}
                      </span>
                    </td>
                    <td style={td}>{review.nextReviewDate ? formatDate(review.nextReviewDate) : 'N/A'}</td>
                    <td style={td}>
                      <span style={getStatusStyle(review.status)}>
                        {review.status}
                      </span>
                    </td>
                  </tr>
                ))
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

        {/* Create Review Modal */}
        {showCreateModal && (
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
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Create Performance Review</h3>
              
              {createError && (
                <div style={{
                  padding: '10px',
                  backgroundColor: '#fee',
                  border: '1px solid #fcc',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  color: '#c00'
                }}>
                  {createError}
                </div>
              )}

              <div style={{ marginBottom: '15px' }}>
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
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' }}>
                  Score (0-100)
                </label>
                <input
                  type="number"
                  name="score"
                  value={formData.score}
                  onChange={handleInputChange}
                  placeholder="Enter score"
                  min="0"
                  max="100"
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
                  Next Review Date
                </label>
                <input
                  type="date"
                  name="nextReviewDate"
                  value={formData.nextReviewDate}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={resetCreateForm}
                  disabled={createLoading}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: createLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: createLoading ? 0.6 : 1
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateReview}
                  disabled={createLoading || !formData.employeeId || !formData.score || !formData.nextReviewDate}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: createLoading ? '#6c757d' : '#0ea5e9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: createLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    opacity: createLoading ? 0.6 : 1
                  }}
                >
                  {createLoading ? 'Creating...' : 'Create Review'}
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

const topCards = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
  if (status === "Completed")
    return {
      padding: "4px 10px",
      background: "#e8f5e9",
      color: "green",
      borderRadius: "20px",
      fontSize: "12px",
    };

  return {
    padding: "4px 10px",
    background: "#fff3cd",
    color: "#856404",
    borderRadius: "20px",
    fontSize: "12px",
  };
};

const getRatingStyle = (rating) => {
  if (rating === "Excellent") return { color: "green", fontWeight: "500" };
  if (rating === "Good") return { color: "#0d6efd", fontWeight: "500" };
  if (rating === "Average") return { color: "#f39c12", fontWeight: "500" };
  return { color: "red", fontWeight: "500" };
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

export default PerformanceAppraisal;
