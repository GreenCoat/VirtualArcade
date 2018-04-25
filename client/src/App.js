import axios from 'axios';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { AddGameContainer, GamesContainer } from './containers';
import { Home, Archive, Welcome, About, Contact, DisplayGame, NotFound } from './components';
import { withUser, update } from './services/withUser';

class App extends React.Component {
  componentDidMount() {
    // this is going to double check that the user is still actually logged in
    // if the app is reloaded. it's possible that we still have a user in sessionStorage
    // but the user's session cookie expired.
    axios.get('http://localhost:8080/api/auth')
      .then(res => {
        // if we get here, the user's session is still good. we'll update the user
        // to make sure we're using the most recent values just in case
        update(res.data);
      })
      .catch(err => {
        // if we get a 401 response, that means the user is no longer logged in
        if (err.response.status === 401) {
          update(null);
        }
      });
  }

  render(){
    const { user } = this.props;
    return (
    <Router history={browserHistory}>
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