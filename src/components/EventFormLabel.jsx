export const EventFormLabel = (props) => {
  const { value = "", label = "" } = props;

  if (!value) {
    return null;
  }

  return (
    <div className="event-form-label">
      <span>{`${label}: ${value}`}</span>
    </div>
  );
};

export default EventFormLabel;
