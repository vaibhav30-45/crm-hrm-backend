const AlertCard = ({ title, value, subtitle }) => {
  return (
    <div className="card alert">
      <h4>{title}</h4>
      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default AlertCard;
