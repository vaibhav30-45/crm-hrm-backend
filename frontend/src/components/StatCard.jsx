import { FaCheck } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
const StatCard = ({ title, value, change, changeType, icon, color = '#3b82f6' }) => {
  return (
    <div className="card">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '15px' 
      }}>
        <div style={{ color: '#000000', fontSize: '12px', fontWeight: '500' }}>{title}</div>
    {/* <FaCheck size={20} color={color} /> */}
    <FaCheckSquare size={20} color={color} />
      </div>
      
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000000', marginBottom: '5px' }}>{value}</div>
      
      {change && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '13px',
          color: changeType === 'positive' ? '#10b981' : '#ef4444'
        }}>
          <span style={{ 
            fontSize: '12px', 
            color: changeType === 'positive' ? '#10b981' : '#ef4444',
            marginRight: '5px'
          }}>
            <FaCheck size={10} color={changeType === 'positive' ? '#10b981' : '#ef4444'} />
          </span>
          {change}
        </div>
      )}
    </div>
  );
};

export default StatCard;
