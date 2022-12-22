import { NOOP } from "../utils";

export const EventFormInput = (props) => {
  const { value = "", onChange = NOOP, label = "" } = props;

  return (
    <div className="event-form-input">
      <span className="event-form-input-label">{`${label}:`}</span>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default EventFormInput;
