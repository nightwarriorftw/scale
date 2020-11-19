import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/NavBar";
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/host" component={Host} /> */}
        {/* <Route exact path="/interviews" component={Interviews} /> */}
        {/* <Route exact path="/interviews/:id" component={InterviewDetails} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
