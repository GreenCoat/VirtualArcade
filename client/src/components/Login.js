import axios from 'axios';
import React from 'react';

class Login extends React.Component {
	constructor(){
		super();

		this.state = {
			username: "",
			password: ""
		}

		this.handleSubmit = (evt) => {
			evt.preventDefault();
			console.log('Form submitted');
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
		return (
			<div>
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