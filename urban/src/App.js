import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/NavBar";
import Home from "./components/Home";
import HostInterview from "./components/Host";
import ScheduledInterviews from "./components/ScheduledInterviews";
import InterviewDetails from "./components/InterviewDetails";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/host" component={HostInterview} />
        <Route exact path="/interviews" component={ScheduledInterviews} />
        <Route exact path="/interviews/:id" component={InterviewDetails} />
      </Switch>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </BrowserRouter>
  );
}

export default App;
