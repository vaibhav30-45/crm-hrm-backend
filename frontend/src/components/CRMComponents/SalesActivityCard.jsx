import { FaPhone, FaEnvelope, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';

const SalesActivityCard = ({ title, value, change, changeType, icon, color = '#3b82f6' }) => {
  const getIcon = () => {
    switch(icon) {
      case 'phone':
        return <FaPhone size={20} color={color} />;
      case 'email':
        return <FaEnvelope size={20} color={color} />;
      case 'whatsapp':
        return <FaWhatsapp size={20} color={color} />;
      case 'calendar':
        return <FaCalendarAlt size={20} color={color} />;
      default:
        return <FaPhone size={20} color={color} />;
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: "500",
            color: "#6b7280",
          }}
        >
          {title}
        </h3>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: color + "20", // Add transparency
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {getIcon()}
        </div>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: "24px",
          fontWeight: "700",
          color: "#111827",
        }}
      >
        {value}
      </p>
      <p
        style={{
          margin: "8px 0 0 0",
          fontSize: "12px",
          color: changeType === 'positive' ? "#059669" : "#dc2626",
          fontWeight: "500",
        }}
      >
        {change}
      </p>
    </div>
  );
};

export default SalesActivityCard;
