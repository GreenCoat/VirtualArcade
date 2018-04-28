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
      .then(() => {
        window.location.href="/login";
        updateUser(null);
      });
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
          <div style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime", textShadow: "0px 0px 10px lime"}}>
          Welcome: {user.username}
          <button className="va-btn" style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime"}} onClick={this.logout}>(Logout)</button>
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