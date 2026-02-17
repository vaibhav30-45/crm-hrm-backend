import { useState } from 'react';
import { FaCalendarAlt, FaUser, FaEdit, FaTrash, FaPlus, FaSearch, FaPhone, FaEnvelope } from 'react-icons/fa';
import DashboardLayout from '../DashboardComponents/DashboardLayout';

const SalesActivities = () => {
  const [activities] = useState([
    { id: 1, type: 'Call', subject: 'Initial contact with John Smith', customer: 'Tech Corp', date: '2025-02-17', time: '10:30 AM', duration: '30 min', status: 'Completed', user: 'Sarah Johnson' },
    { id: 2, type: 'Email', subject: 'Proposal sent to Marketing Inc', customer: 'Marketing Inc', date: '2025-02-17', time: '09:15 AM', duration: '-', status: 'Sent', user: 'Mike Wilson' },
    { id: 3, type: 'Meeting', subject: 'Product demo with Sales Pro', customer: 'Sales Pro', date: '2025-02-16', time: '02:00 PM', duration: '1 hour', status: 'Completed', user: 'Emily Davis' },
    { id: 4, type: 'Call', subject: 'Follow up with Consulting Ltd', customer: 'Consulting Ltd', date: '2025-02-16', time: '11:30 AM', duration: '45 min', status: 'Completed', user: 'Chris Lee' },
    { id: 5, type: 'Email', subject: 'Contract review with Global Tech', customer: 'Global Tech', date: '2025-02-15', time: '04:20 PM', duration: '-', status: 'Opened', user: 'Lisa Anderson' },
    { id: 6, type: 'Meeting', subject: 'Quarterly review with Service Co', customer: 'Service Co', date: '2025-02-15', time: '10:00 AM', duration: '2 hours', status: 'Completed', user: 'Tom Brown' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !typeFilter || activity.type === typeFilter;
    const matchesStatus = !statusFilter || activity.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Call': return <FaPhone color="#3b82f6" />;
      case 'Email': return <FaEnvelope color="#10b981" />;
      case 'Meeting': return <FaCalendarAlt color="#f59e0b" />;
      default: return <FaCalendarAlt color="#6b7280" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return '#10b981';
      case 'Sent': return '#3b82f6';
      case 'Opened': return '#f59e0b';
      case 'Scheduled': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

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

        .content {
          padding: 20px;
          overflow-y: auto;
        }
      `}</style>
      
      
    </DashboardLayout>
  );
};

export default SalesActivities;
