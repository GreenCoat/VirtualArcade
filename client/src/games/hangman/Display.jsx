import React from 'react';
import './Hangman.css';

class Display extends React.Component {
	constructor() {
		super();

	this.pictures = [
	`....._______<br/>
	.....|.....|<br/>
	.....X.....|<br/>
	..../|\\....|<br/>
	.....|.....|<br/>
	..../.\\....|<br/>
	...........|<br/>
	============`,
	`....._______<br/>
	.....|.....|<br/>
	.....0.....|<br/>
	..../|\\....|<br/>
	.....|.....|<br/>
	..../......|<br/>
	...........|<br/>
	============`,
	`....._______<br/>
	.....|.....|<br/>
	.....0.....|<br/>
	..../|\\....|<br/>
	.....|.....|<br/>
	...........|<br/>
	...........|<br/>
	============`,
	`....._______<br/>
	.....|.....|<br/>
	.....0.....|<br/>
	..../|\\....|<br/>
	...........|<br/>
	...........|<br/>
	...........|<br/>
	============`,
	`....._______<br/>
	.....|.....|<br/>
	.....0.....|<br/>
	..../|.....|<br/>
	...........|<br/>
	...........|<br/>
	...........|<br/>
	============`,
	`....._______<br/>
	.....|.....|<br/>
	.....0.....|<br/>
	.....|.....|<br/>
	...........|<br/>
	...........|<br/>
	...........|<br/>
	============`,
	`....._______<br/>
	.....|.....|<br/>
	.....0.....|<br/>
	...........|<br/>
	...........|<br/>
	...........|<br/>
	...........|<br/>
	============`,
	`....._______<br/>
	.....|.....|<br/>
	...........|<br/>
	...........|<br/>
	...........|<br/>
	...........|<br/>
	...........|<br/>
	============`,
	]

		this.state = {
			value: '',
			guess: 'bar'
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt){
		let reg = /^[A-Za-z]$/;
		let val = evt.target.value;
		if(reg.test(val) || val == '')
			this.setState({value: evt.target.value.toUpperCase()});
		else
			this.setState({value: this.state.value});
	}

	handleSubmit(evt){
		evt.preventDefault();
		this.setState({value: ''});
		this.props.makeGuess(this.state.value);
	}

	render() {
		return (
			<div id="display">
			<div style={{display: 'grid', gridTemplateColumns: '240px 120px'}}>
				<div>
					<div style={{fontSize: '30px'}} dangerouslySetInnerHTML={{__html: this.pictures[this.props.guessesRemaining]}}>
					 	
					</div>
					<div style={{fontSize: "24px", marginBottom: "5px"}}>
						{this.props.display}
					</div>
				</div>
				<div>
					<div style={{margin: "10px", fontSize: '24px'}}>
						Guesses:
						<div style={{height: '30px', border: '1px solid lime', padding: '0px'}}> 
						{this.props.guesses}
						</div>
					</div>
					<div style={{fontSize: "18px"}}>
						{this.props.guessesRemaining} chances left
					</div>
				</div>
			</div>
			<div class="separator"></div>
				{this.props.gameOn ? (
					<form onSubmit={this.handleSubmit}>
						<input type="text" value={this.state.value} onChange={this.handleChange}/>
					</form>
				) : (this.props.gameWin === null ? (
					<button onClick={this.props.gameReset}>Game Start</button>
					) : (
					<button onClick={this.props.gameReset}>Replay?</button>
					) 
				)}
			</div>
		);
	}
}

export default Display;