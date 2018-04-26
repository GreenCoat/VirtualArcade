import axios from 'axios';
import React from 'react';
import { Link } from 'react-router'

class Create extends React.Component {
	constructor(){
		super();

		this.state = {
			username: null,
			password: null,
			message: 'Request Credentials:'
		}
	

	this.handleChange = (evt) => {
			let id = evt.target.id;
			let val = evt.target.value;

			this.setState({
				[id]: val
			});
	}

	this.createLogin = (evt) => {
		evt.preventDefault();

		const { username, password } = this.state;
		const { history } = this.props;

		this.setState({
			error: null
		});

		if (!username || !password) {
      		this.setState({
        		message: 'Username or password cannot be blank'
      		});
      		return;
    	}

    	axios.post('http://localhost:8080/api/users', {
      		username,
      		password
    		})
      		.then(user => {
        		window.location.href="/login";
      		})
      		.catch(err => {
      			console.log(err);
				this.setState({
          		message: err.response.data.message || err.message
        	});
      	});
  	}
  }

  	render(){
  		const {message} = this.state;

  		return (
  			<div className="container" style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", background: "black", color: "lime", padding: "20px"}}>
          <div>
            { message }
          </div>
        <form style={{border: "2px solid lime", margin: "10px", padding: "10px"}} onSubmit={this.createLogin}>
            Username: <input type="text" style={{fontFamily: "'Press Start 2P', monospace", padding: "5px", border: "1px solid lime"}} id="username" value={this.state.username} onChange={this.handleChange}/><br/>
            Password: <input type="text" style={{fontFamily: "'Press Start 2P', monospace", padding: "5px", border: "1px solid lime"}} id="password" value={this.state.password} onChange={this.handleChange}/><br/>
            <button className="va-btn" type='submit' style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px"}}>Request Authorization</button><br/>
            <div style={{margin: "10px"}}>OR</div>
            <Link style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime"}}  to="/login">Return to Authentication</Link>
        </form>
      </div>
  		)

  	}
}

export default Create;