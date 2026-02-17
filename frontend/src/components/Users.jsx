import { useState } from 'react';
import { FaUser, FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import DashboardLayout from './DashboardComponents/DashboardLayout';

const Users = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '+1 234-567-8901', lastLogin: '2025-02-17 09:30 AM', department: 'IT', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '+1 234-567-8902', lastLogin: '2025-02-17 08:45 AM', department: 'HR', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', mobile: '+1 234-567-8903', lastLogin: '2025-02-16 04:20 PM', department: 'Sales', role: 'Employee', status: 'Inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', mobile: '+1 234-567-8904', lastLogin: '2025-02-17 10:15 AM', department: 'IT', role: 'Employee', status: 'Active' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', mobile: '+1 234-567-8905', lastLogin: '2025-02-17 07:30 AM', department: 'HR', role: 'Manager', status: 'Active' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', mobile: '+1 234-567-8906', lastLogin: '2025-02-15 02:30 PM', department: 'Finance', role: 'Employee', status: 'Active' },
    { id: 7, name: 'Chris Lee', email: 'chris@example.com', mobile: '+1 234-567-8907', lastLogin: '2025-02-17 11:00 AM', department: 'IT', role: 'Employee', status: 'Active' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', mobile: '+1 234-567-8908', lastLogin: '2025-02-14 09:15 AM', department: 'Sales', role: 'Employee', status: 'Inactive' },
    
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !departmentFilter || user.department === departmentFilter;
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const departments = [...new Set(users.map(user => user.department))];
  const roles = [...new Set(users.map(user => user.role))];
  const statuses = [...new Set(users.map(user => user.status))];

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <DashboardLayout>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }
        
        .layout {
          display: flex;
          height: 100vh;
        }

        .sidebar {
          width: 270px;
          background: #000000;
          color: white;
          padding: 20px;
        }

        .logo {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 30px;
        }

        .menu {
          list-style: none;
        }

        .menu li {
          padding: 12px;
          cursor: pointer;
          border-radius: 6px;
          margin-bottom: 5px;
        }

        .menu li:hover,
        .menu .active {
          background: #17A1CB;
        }

        .logout {
          margin-top: 30px;
          color: #f87171;
        }

        .main {
          flex: 1;
          background: #f1f5f9;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          background: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .search {
          padding: 8px;
          width: 250px;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          border-radius: 50%;
        }

        .content {
          padding: 20px;
          overflow-y: auto;
        }
      `}</style>
      
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '12px', 
        padding: '24px', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        marginBottom: '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px' 
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#1e293b', 
            fontSize: '24px',
            fontWeight: '600'
          }}>
            <FaUser style={{ marginRight: '10px', color: '#0ea5e9' }} />
            Users Management
          </h2>
          <button style={{
            backgroundColor: '#0ea5e9',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            transition: 'all 0.2s ease'
          }}>
            <FaPlus style={{ marginRight: '8px' }} />
            Add User
          </button>
        </div>

        {/* Filters Section */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#374151'
            }}>
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                handleFilterChange();
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#374151'
            }}>
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                handleFilterChange();
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '14px', 
              fontWeight: '500',
              color: '#374151'
            }}>
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                handleFilterChange();
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ 
          position: 'relative', 
          marginBottom: '24px',
          maxWidth: '400px'
        }}>
          <FaSearch style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#64748b'
          }} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff'
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  color: '#64748b', 
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>Name</th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  color: '#64748b', 
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>Email</th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  color: '#64748b', 
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>Mobile Number</th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  color: '#64748b', 
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>Last Login</th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  color: '#64748b', 
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>Role</th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  color: '#64748b', 
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>Status</th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'center', 
                  color: '#64748b', 
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr 
                  key={user.id} 
                  style={{ 
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#e0f2fe',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px'
                      }}>
                        <FaUser size={14} color="#0ea5e9" />
                      </div>
                      <span style={{ color: '#1e293b', fontSize: '14px', fontWeight: '500' }}>
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>
                      {user.email}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>
                      {user.mobile}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>
                      {user.lastLogin}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: user.role === 'Admin' ? '#fef3c7' : 
                                       user.role === 'Manager' ? '#dbeafe' : '#f3f4f6',
                      color: user.role === 'Admin' ? '#92400e' : 
                             user.role === 'Manager' ? '#1e40af' : '#374151'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: user.status === 'Active' ? '#d1fae5' : '#fee2e2',
                      color: user.status === 'Active' ? '#065f46' : '#991b1b'
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: '8px' 
                    }}>
                      <button
                        style={{
                          backgroundColor: '#3b82f6',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#2563eb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#3b82f6';
                        }}
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        style={{
                          backgroundColor: '#ef4444',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#dc2626';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#ef4444';
                        }}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginTop: '24px',
            gap: '8px'
          }}>
            {/* Previous Button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                backgroundColor: currentPage === 1 ? '#f8fafc' : '#ffffff',
                color: currentPage === 1 ? '#cbd5e1' : '#374151',
                borderRadius: '6px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {(() => {
              const pages = [];
              const maxVisiblePages = 5;
              
              if (totalPages <= maxVisiblePages) {
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                if (currentPage <= 3) {
                  for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                  }
                  pages.push('...');
                  pages.push(totalPages);
                } else if (currentPage >= totalPages - 2) {
                  pages.push(1);
                  pages.push('...');
                  for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  pages.push(1);
                  pages.push('...');
                  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                  }
                  pages.push('...');
                  pages.push(totalPages);
                }
              }
              
              return pages.map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} style={{ 
                    padding: '8px 4px',
                    color: '#64748b',
                    fontSize: '14px'
                  }}>
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: currentPage === page ? '#0ea5e9' : '#ffffff',
                      color: currentPage === page ? '#ffffff' : '#374151',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {page}
                  </button>
                )
              ));
            })()}

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                backgroundColor: currentPage === totalPages ? '#f8fafc' : '#ffffff',
                color: currentPage === totalPages ? '#cbd5e1' : '#374151',
                borderRadius: '6px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
            >
              Next
            </button>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#64748b'
          }}>
            <FaUser size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>No users found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Users;
