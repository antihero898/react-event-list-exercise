import "../styles.css";

export const EventButton = (props) => {
  const { onClick, label, className } = props;

  return (
    <div className={`event-button-container ${className}`}>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default EventButton;
