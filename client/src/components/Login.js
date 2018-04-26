import axios from 'axios';
import React from 'react';
import { updateUser } from '../services/withUser';

class Login extends React.Component {
	constructor(){
		super();

		this.state = {
			username: null,
			password: null
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
				history.push('/games');
			})
			.catch(err => {
				console.log(err);
				this.setState({
					error: err.response.status === 401 ? 'Invalid username or password' : err.response.status === 400 ? 'Username and password cannot be blank' :err.message
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
		const { error } = this.state;

		return (
			<div className="container" style={{fontFamily: "'Press Start 2P', monospace", background: "black", padding: "20px"}}>
				Enter Authorization
				{error &&
					<div>
						{error}
					</div>
				}
				<form onSubmit={this.handleSubmit}>
						Username: <input type="text" style={{fontFamily: "'Press Start 2P', monospace"}} id="username" value={this.state.username} onChange={this.handleChange}/><br/>
						Password: <input type="text" style={{fontFamily: "'Press Start 2P', monospace"}} id="password" value={this.state.password} onChange={this.handleChange}/><br/>
						<button type='submit' style={{fontFamily: "'Press Start 2P', monospace"}}>Authenticate</button>
				</form>
			</div>
		);
	}
}

export default Login;