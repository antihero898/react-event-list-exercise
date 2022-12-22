import { Link } from "react-router-dom";

import { EventButton } from "./EventButton";
import "../styles.css";

export const EventItem = (props) => {
  const { id, name, company, description, onRemove } = props;

  const onClick = () => onRemove(id);

  return (
    <div className="event-item-container">
      <Link to={`/event/${id}`} key={id}>
        <span className="event-info-header">{`${name} - ${company}`}</span>
      </Link>
      <span className="event-info-description">{description}</span>
      <EventButton
        className="event-item-button"
        onClick={onClick}
        label="Remove"
      />
    </div>
  );
};

export default EventItem;
