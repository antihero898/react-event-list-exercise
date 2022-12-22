import "./styles.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { EventManager } from "./routes/EventManager";
import { EventInfo } from "./routes/EventInfo";

const queryClient = new QueryClient();

/**
 * This is a simple react application that
 * uses react-query to update, create, delete, and query
 * event list data. This also uses react-router
 * to show a simple example of route navigation
 * between views.
 */
export const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<EventManager />}>
            <Route path="/event/:eventId" element={<EventInfo />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
