import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { Outlet } from "react-router-dom";

import { EMPTY_ARRAY, EMPTY_OBJECT, sortByCompanyName } from "../utils";
import { EventForm } from "../components/EventForm";
import { EventList } from "../components/EventList";

import "../styles.css";

/**
 * @typedef EventItem
 * @property {number} id
 * @property {string} color
 * @property {boolean} isActive
 * @property {string} name
 * @property {string} date
 * @property {string} title
 * @property {string} company
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} description
 * @property {string} image
 * @property {string} createdOn
 */

export const EventManager = () => {
  // TODO: refactor so that we useQueryClient to force refetches via query keys

  // -------- queries --------
  const { data: eventList = EMPTY_ARRAY, refetch: refetchEventList } = useQuery(
    "eventList",
    () =>
      axios
        .get("https://rf-json-server.herokuapp.com/events/")
        .then((res = EMPTY_OBJECT) => res.data)
        .catch((err) => {
          console.error(
            "Error occurred when attempting to retrive event list:",
            err
          );
        })
  );

  // -------- mutations --------
  const removeEventItemMutation = useMutation(
    (eventId) =>
      axios
        .delete(`https://rf-json-server.herokuapp.com/events/${eventId}`)
        .catch((err) => {
          console.error(
            "Error occurred when attempting to remove an event:",
            err
          );
        }),
    {
      onSuccess: () => {
        refetchEventList();
      }
    }
  );

  const onRemove = (id) => {
    removeEventItemMutation.mutate(id);
  };

  const eventListSortedByCompany = eventList.sort(sortByCompanyName);

  return (
    <div className="app-container">
      <div>
        <EventList
          eventListData={eventListSortedByCompany}
          onRemove={onRemove}
        />
        <EventForm refetchEventListFn={refetchEventList} />
      </div>
      <Outlet />
    </div>
  );
};

export default EventManager;
