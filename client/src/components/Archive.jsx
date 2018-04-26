import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { withUser } from '../services/withUser';

class Layout extends PureComponent {
  render () {
    const { user } = this.props;

    return (
      <div className="view">
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              {user && 
          <div>
          {user.username}
          <button>Logout</button>
          </div>
        }
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="navbar-brand" to="/">
                <img src="https://cdn.filestackcontent.com/RHXucTfJTbmjsVbS6Nhq" className="header-logo" />
              </Link>
            </div>
          </div>
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