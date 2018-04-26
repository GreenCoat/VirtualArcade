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