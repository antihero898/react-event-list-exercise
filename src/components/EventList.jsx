import { EMPTY_OBJECT } from "../utils";
import { EventItem } from "./EventItem";
import "../styles.css";

export const EventList = (props) => {
  const { eventListData, onRemove } = props;
  return (
    <div className="event-list-container">
      {eventListData.map(
        ({ id, name, company, description } = EMPTY_OBJECT) => {
          return (
            <EventItem
              key={id}
              id={id}
              name={name}
              company={company}
              description={description}
              onRemove={() => onRemove(id)}
            />
          );
        }
      )}
    </div>
  );
};
