import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </Router>
);

export default App;