import axios from 'axios';
import React from 'react';
import { Link } from 'react-router';
import { updateUser } from '../services/withUser';

class Login extends React.Component {
	constructor(){
		super();

		this.state = {
			username: null,
			password: null,
			message: 'Enter Authorization:'
		}

		this.handleSubmit = (evt) => {
			evt.preventDefault();
			console.log('logging in');			

			const { username, password } = this.state;
			const { history } = this.props;

			axios.post('http://localhost:8080/api/auth', {
				username,
				password
			})
			.then(user => {
				updateUser(user.data);
				window.location.href="/games";
			})
			.catch(err => {
				console.log(err);
				this.setState({
					message: err.response.status === 401 ? 'Invalid username or password' : err.response.status === 400 ? 'Username or password cannot be blank' :err.message
				});
			});
		}

		this.handleChange = (evt) => {
			let id = evt.target.id;
			let val = evt.target.value;

			this.setState({
				[id]: val
			});
		}
	}
	render(){
		const { message } = this.state;

		return (
			<div className="container" style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", background: "black", color: "lime", padding: "20px"}}>
					<div>
						{ message }
					</div>
				<form style={{border: "2px solid lime", margin: "10px", padding: "10px"}} onSubmit={this.handleSubmit}>
						Username: <input type="text" style={{fontFamily: "'Press Start 2P', monospace", padding: "5px", border: "1px solid lime"}} id="username" value={this.state.username} onChange={this.handleChange}/><br/>
						Password: <input type="text" style={{fontFamily: "'Press Start 2P', monospace", padding: "5px", border: "1px solid lime"}} id="password" value={this.state.password} onChange={this.handleChange}/><br/>
						<button type='submit' style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px"}}>Authenticate</button><br/>
						<div style={{margin: "10px"}}>OR</div>
						<Link style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime"}}  to="/create">Request Authorization</Link>
				</form>
			</div>
		);
	}
}

export default Login;