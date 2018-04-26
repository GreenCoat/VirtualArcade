import axios from 'axios';
import React from 'react';

class Create extends React.Component {
	constructor(){
		super();

		this.state = {
			username: null,
			password: null,
			error: null
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
        		error: 'A username and password is required.'
      		});
      		return;
    	}

    	axios.post('http://localhost:8080/api/users', {
      		username,
      		password
    		})
      		.then(user => {
        		// if the response is successful, make them log in
        		//history.push('/contact');
      		})
      		.catch(err => {
      			console.log(err);
				this.setState({
          		error: err.response.data.message || err.message
        	});
      	});
  	}
  }

  	render(){
  		const {error} = this.state;

  		return (
  			<div>
  				{error &&
                	<div>
                  		{error}
                	</div>
             	 }
				<form onSubmit={this.createLogin}>
					<input type="text" id="username" value={this.state.username} onChange={this.handleChange}/>
					<input type="text" id="password" value={this.state.password} onChange={this.handleChange}/>
					<button type='submit'>Create</button>
				</form>			
        </div>
  		)

  	}
}

export default Create;