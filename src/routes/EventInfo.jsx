import { useEffect, useReducer, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";

import { EventFormInput } from "../components/EventFormInput";
import { EventFormLabel } from "../components/EventFormLabel";
import { EventButton } from "../components/EventButton";
import { EMPTY_OBJECT } from "../utils";

import "../styles.css";

const eventFormReducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "description":
      return { ...state, description: action.value };
    case "company":
      return { ...state, company: action.value };
    case "color":
      return { ...state, color: action.value };
    default:
      return action;
  }
};

const useEventItem = (eventId) =>
  useQuery(
    "eventItem",
    () =>
      axios
        .get(`https://rf-json-server.herokuapp.com/events/${eventId}`)
        .then((res) => res.data)
        .catch((err) =>
          console.error(
            "Error thrown upon attempting to look up an individual event id:",
            err
          )
        ),
    {
      enabled: !!eventId
    }
  );

export const EventInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const lastSelectedEventId = useRef();
  const queryClient = useQueryClient();

  const { eventId } = params;

  const { data: eventItem = EMPTY_OBJECT, isFetching } = useEventItem(eventId);
  const [state, dispatch] = useReducer(eventFormReducer, eventItem);

  // ensuring we never have stale data when coming from the outside world
  useEffect(() => {
    if (isFetching || lastSelectedEventId.current === eventId) {
      return;
    }

    dispatch(eventItem);
    lastSelectedEventId.current = eventId;
  }, [eventItem, lastSelectedEventId, eventId, isFetching]);

  const {
    description,
    name,
    company,
    color,
    date,
    title,
    email,
    phone,
    address,
    image
  } = state;

  // ------ mutations ------
  const updateEventItemMutation = useMutation(
    (requestObject) =>
      axios({
        method: "put",
        url: `https://rf-json-server.herokuapp.com/events/${eventId}`,
        data: requestObject,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.data)
        .catch((err) => {
          console.error(
            "Error occurred when attempting to update an event:",
            err
          );
        }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("eventList");
      }
    }
  );

  const onClose = () => {
    dispatch(EMPTY_OBJECT);
    navigate("/");
  };

  const onConfirm = () => {
    const requestObject = {
      id: state?.id,
      name: state?.name,
      color: state?.color,
      company: state?.company,
      description: state?.description
    };

    updateEventItemMutation.mutate(requestObject);
    dispatch(EMPTY_OBJECT);
    navigate("/");
  };

  if (!eventId || isFetching) {
    return null;
  }

  return (
    <div className="event-info-background-container">
      <div className="event-info-container">
        <div className="event-info-header">Event Details</div>
        <EventFormInput
          label="Name"
          value={name}
          onChange={(ev) => {
            const inputText = ev?.target?.value || "";
            dispatch({ type: "name", value: inputText });
          }}
        />
        <EventFormInput
          label="Description"
          value={description}
          onChange={(ev) => {
            const inputText = ev?.target?.value || "";
            dispatch({ type: "description", value: inputText });
          }}
        />
        <EventFormInput
          label="Company"
          value={company}
          onChange={(ev) => {
            const inputText = ev?.target?.value || "";
            dispatch({ type: "company", value: inputText });
          }}
        />
        <EventFormInput
          label="Color"
          value={color}
          onChange={(ev) => {
            const inputText = ev?.target?.value || "";
            dispatch({ type: "color", value: inputText });
          }}
        />
        <EventFormLabel label="Date" value={date} />
        <EventFormLabel label="title" value={title} />
        <EventFormLabel label="Email" value={email} />
        <EventFormLabel label="Phone" value={phone} />
        <EventFormLabel label="Address" value={address} />
        <img src={image} alt={image} style={{ margin: "5px" }} />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <EventButton onClick={onClose} label="Close" />
          <EventButton onClick={onConfirm} label="Update Event" />
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
