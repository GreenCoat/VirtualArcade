import axios from 'axios';
import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import Login from './Login';
import Create from './Create';
import { withUser } from '../services/withUser';

class Welcome extends PureComponent {
  constructor(){
    super();

    this.state = {
      stuff: null
    }

    this.logout = (evt) => {
      evt.preventDefault();

      axios.delete('http://localhost:8080/api/auth')
      .then(user => console.log('user logged out'))
    }

    this.userProfile = (evt) => {
      evt.preventDefault();

      axios.get('http://localhost:8080/api/auth')    
    }
  }

  componentDidMount(){
    if(!this.props.user){
      return;
    }

    axios.get('http://localhost:8080/api/stuff')
      .then(res => {
        this.setState({
          stuff: res.data
        });
      })
      .catch(err => {
        // if we got an error, we'll just log it and set stuff to an empty array
        console.log(err);
        this.setState({
          stuff: []
      });
    });
  }


  render () {
    const { user } = this.props;
    const { stuff } = this.state;

    return (
      <div className="inner cover">
        {user && 
          <div>
          {user.username}
          <button onClick={this.logout}>Logout</button>
          </div>
        }
        <h1 className="cover-heading">Welcome</h1>
        <button onClick={this.userProfile}>Get User</button>
        <p className="lead">
          <Link className="btn btn-lg" to="/games">Browse!</Link>
          <Login />
          <Create />
        </p>
      </div>
    );
  }
}

export default withUser(Welcome);