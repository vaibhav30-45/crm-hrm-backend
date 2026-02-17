import { useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import "../../styles/layout.css";

const CustomerManagement = () => {
  const [customers] = useState([
    {
      id: 1,
      customerName: "Rahul Patel",
      email: "rahul.patel@example.com",
      phone: "+91 98765 43210",
      address: "123, MG Road, Bangalore, Karnataka 560001",
      status: "Active",
    },
    {
      id: 2,
      customerName: "Neha Shah",
      email: "neha.shah@example.com",
      phone: "+91 98765 43211",
      address: "456, Park Street, Kolkata, West Bengal 700016",
      status: "Active",
    },
    {
      id: 3,
      customerName: "Pooja Patel",
      email: "pooja.patel@example.com",
      phone: "+91 98765 43212",
      address: "789, Connaught Place, New Delhi 110001",
      status: "Inactive",
    },
    {
      id: 4,
      customerName: "Amit Kumar",
      email: "amit.kumar@example.com",
      phone: "+91 98765 43213",
      address: "321, Marine Drive, Mumbai, Maharashtra 400020",
      status: "Active",
    },
    {
      id: 5,
      customerName: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      phone: "+91 98765 43214",
      address: "656, Jubilee Hills, Hyderabad, Telangana 500033",
      status: "Active",
    },
    {
      id: 6,
      customerName: "Vikram Singh",
      email: "vikram.singh@example.com",
      phone: "+91 98765 43215",
      address: "987, Brigade Road, Bangalore, Karnataka 560025",
      status: "Active",
    },
    {
      id: 7,
      customerName: "Anjali Gupta",
      email: "anjali.gupta@example.com",
      phone: "+91 98765 43216",
      address: "147, Anna Salai, Chennai, Tamil Nadu 600002",
      status: "Inactive",
    },
    {
      id: 8,
      customerName: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43217",
      address: "258, Bandra West, Mumbai, Maharashtra 400050",
      status: "Active",
    },
    {
      id: 9,
      customerName: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43218",
      address: "369, Sector 17, Chandigarh 160017",
      status: "Active",
    },
    {
      id: 10,
      customerName: "Karthik Nair",
      email: "karthik.nair@example.com",
      phone: "+91 98765 43219",
      address: "741, MG Road, Pune, Maharashtra 411001",
      status: "Active",
    },
    {
      id: 11,
      customerName: "Divya Menon",
      email: "divya.menon@example.com",
      phone: "+91 98765 43220",
      address: "852, Residency Road, Bangalore, Karnataka 560025",
      status: "Inactive",
    },
    {
      id: 12,
      customerName: "Arjun Verma",
      email: "arjun.verma@example.com",
      phone: "+91 98765 43221",
      address: "963, Nehru Place, New Delhi 110019",
      status: "Active",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(6);

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getBadgeStyle = (status) => {
    const styles = {
      Active: { bg: "#ecfdf5", color: "#16a34a", border: "#bbf7d0" },
      Inactive: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
    };

    return (
      styles[status] || {
        bg: "#f3f4f6",
        color: "#6b7280",
        border: "#e5e7eb",
      }
    );
  };

  return (
    <DashboardLayout>
      <div
        style={{
          padding: "24px",
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          {/* TABLE */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f9fafb" }}>
              <tr>
                {[
                  "Customer Name",
                  "Email",
                  "Phone",
                  "Address",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#6b7280",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentCustomers.map((customer) => {
                const statusStyle = getBadgeStyle(customer.status);

                return (
                  <tr
                    key={customer.id}
                    style={{ borderBottom: "1px solid #f3f4f6" }}
                  >
                    <td style={{ padding: "14px 16px", fontWeight: 500 }}>
                      {customer.customerName}
                    </td>

                    <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                      {customer.email}
                    </td>

                    <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                      {customer.phone}
                    </td>

                    <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                      {customer.address}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          fontSize: "12px",
                          borderRadius: "6px",
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: `1px solid ${statusStyle.border}`,
                          fontWeight: 500,
                        }}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "#9ca3af",
                        }}
                      >
                        ⋯
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              background: "#f9fafb",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontSize: "13px",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>

            <div style={{ display: "flex", gap: "6px" }}>
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
                        minWidth: "32px",
                        height: "32px",
                        borderRadius: "6px",
                        border:
                          page === currentPage
                            ? "1px solid #0ea5e9"
                            : "1px solid #e5e7eb",
                        background: page === currentPage ? "#e0f2fe" : "#ffffff",
                        fontSize: "13px",
                        cursor: "pointer",
                        color: page === currentPage ? "#0ea5e9" : "#374151",
                        fontWeight: page === currentPage ? "500" : "400",
                      }}
                    >
                      {page}
                    </button>
                  )
                ));
              })()}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontSize: "13px",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerManagement;
