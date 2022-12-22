import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";

import { EventFormInput } from "./EventFormInput";
import { EventButton } from "./EventButton";
import { NOOP } from "../utils";

import "../styles.css";

export const EventForm = (props) => {
  const { refetchEventListFn = NOOP } = props;

  // todo: refactor into a reducer via useReducer like EventInfo
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [color, setColor] = useState("");

  const createEventItemMutation = useMutation((requestObject) =>
    axios({
      method: "post",
      url: "https://rf-json-server.herokuapp.com/events/",
      data: requestObject,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.data)
      .catch((err) => {
        console.error(
          "Error occurred when attempting to create an event:",
          err
        );
      })
  );

  const onAddEventClick = () => {
    const requestObject = {
      name,
      description,
      company,
      color
    };

    createEventItemMutation.mutate(JSON.stringify(requestObject), {
      onSuccess: () => {
        refetchEventListFn();
        setName("");
        setCompany("");
        setDescription("");
        setColor("");
      }
    });
  };

  return (
    <div className="event-form-container">
      <div className="event-form-header">Add an Event</div>
      <EventFormInput
        label="Name"
        value={name}
        onChange={(ev) => {
          const inputText = ev?.target?.value || "";
          setName(inputText);
        }}
      />
      <EventFormInput
        label="Description"
        value={description}
        onChange={(ev) => {
          const inputText = ev?.target?.value || "";
          setDescription(inputText);
        }}
      />
      <EventFormInput
        label="Company"
        value={company}
        onChange={(ev) => {
          const inputText = ev?.target?.value || "";
          setCompany(inputText);
        }}
      />
      <EventFormInput
        label="Color"
        value={color}
        onChange={(ev) => {
          const inputText = ev?.target?.value || "";
          setColor(inputText);
        }}
      />
      <EventButton onClick={onAddEventClick} label="Add Event" />
    </div>
  );
};

export default EventForm;
