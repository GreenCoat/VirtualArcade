import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { AddGameContainer, GamesContainer } from './containers';
import { Home, Archive, Welcome, About, Contact, DisplayGame, NotFound } from './components';
import { withUser, update } from './services/withUser';

class App extends React.Component {

  render(){
    return (
    <Router history={hashHistory}>
        <Route path="/" component={Home}>
        <IndexRoute component={Welcome} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Route>
      <Route path="/games" component={Archive}>
        <IndexRoute component={GamesContainer} />
        <Route path="add" component={AddGameContainer} />
        <Route path=":game" component={DisplayGame} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
    );
  }
}

export default withUser(App);