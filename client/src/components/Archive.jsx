import axios from 'axios';
import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { withUser, updateUser } from '../services/withUser';

class Layout extends PureComponent {
  constructor(){
    super();

    this.logout = (evt) => {
      evt.preventDefault();

      axios.delete('http://localhost:8080/api/auth')
      .then(() => {updateUser(null);});
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

    axios.defaults.withCredentials = true;
  }


  render () {
    const { user } = this.props;

    return (
      <div className="view">
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <img src="https://cdn.filestackcontent.com/RHXucTfJTbmjsVbS6Nhq" className="header-logo" />
              </Link>
            </div>
          </div>
          {user && 
          <div>
          {user.username}
          <button onClick={this.logout}>Logout</button>
          <Link to="/profile">Profile</Link>
          </div>
          }
        </nav>
        {this.props.children}
        <footer className="text-center">
          <p>© 2018 Virtual Arcade</p>
        </footer>
      </div>
    );
  }
}

export default withUser(Layout);