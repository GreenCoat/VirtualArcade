import axios from 'axios';
import React from 'react';

class Login extends React.Component {
	constructor(){
		super();

		this.state = {
			username: null,
			password: null
		}

		this.handleSubmit = (evt) => {
			evt.preventDefault();
			console.log('Form submitted');
			const { username, password } = this.state;

			axios.post('http://localhost:8080/api/auth', {
				username,
				password
			})
			.then(user => {
				console.log('User success');
				console.log(user);
				update(user.data);
			})
			.catch(err => {
				this.setState({
					error: err.response.status === 401 ? 'Invalid username or password' : err.message
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
			<div>
				{error &&
					<div>
						{error}
					</div>
				}
				<form onSubmit={this.handleSubmit}>
						<input type="text" id="username" value={this.state.username} onChange={this.handleChange}/>
						<input type="text" id="password" value={this.state.password} onChange={this.handleChange}/>
						<button type='submit'>Login</button>
				</form>
			</div>
		);
	}
}

export default Login;