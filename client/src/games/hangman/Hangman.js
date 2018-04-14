import React from 'react';
import ReactDOM from 'react-dom';
import './Hangman.css';

class Display extends React.Component {
	constructor() {
		super();
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

	pictures = [
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

	render() {
		console.log(this.props);
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

class Hangman extends React.Component {
	constructor() {
		super();

		this.state = {
			word: [],
			guesses: [],
			display: [],
			guessesRemaining: 7,
			gameOn: false,
			gameWin: null
		}
	}

	componentWillMount(){
		this.gameReset();
	}

	makeGuess = (val) => {
		//Set up variables
		let guess = this.state.guesses;
		let word = this.state.word;
		//Cheat to create a copy of display array
		let display = JSON.parse(JSON.stringify(this.state.display));

		//Check if guess has already been tried
		if(guess.indexOf(val) == -1){
			console.log('Letter hasnt been guessed');
			//Check if word contains submitted value
			if(word.indexOf(val) != -1){
				console.log('Letter in word');
				//Loop over display array and update matching letters
				for(var i = 0; i < word.length; i++){
					if(word[i] == val){
					display[i+i] = val;
					}
				}
				//Check if all letters are now filled correctly
				if(display.indexOf("_") == -1){
					//Set game win state
					this.setState({display: display,
							  	   gameOn: false,
						           gameWin: true});
				} else {
					//Otherwise set state with new display
					this.setState({display: display});
				}
			//If entered value isn't blank, handle it
			} else if(val != ''){
				console.log('Letter not in word');
				//If it hasn't been guessed and there are guesses remaining, update guess array and minus a guess
				if(this.state.guessesRemaining > 1){
					this.setState({
						guesses: guess.concat(val),
						guessesRemaining: this.state.guessesRemaining - 1
					});
				//If there will be no more guesses remaining, set game over state
				} else if(this.state.guessesRemaining == 1){
					this.setState({
						guesses: guess.concat(val),
						guessesRemaining: this.state.guessesRemaining - 1,
						gameOn: false,
						gameWin: false
					});
				}
			}
		} 
	}

	getWord = () => {
		//Get/make word list
		let words = ['Foobar', 'Pineapple', 'Potato'];
		//Get random word from list
		let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
		console.log(word);
		//Return word converted to an array
		return word.split('');
	}

	setDisplay = (word) => {
		//Create empty array
		let display = [];

		//Add _ to array for each letter in source
		for(var i = 0; i < word.length; i++){
			display.push('_');
			display.push(' ');
		}
		console.log(display);
		//Return display array
		return display;
	}

	gameReset = () => {
		let word = this.getWord();
		let display = this.setDisplay(word);

		this.setState({word: word, 
				  	   display: display,
				  	   guesses: [],
				  	   guessesRemaining: 7,
				  	   gameOn: true,
				  	   gameWin: null});
	}

	render() {
		return (
			<div id="hangman">
			HANGMAN
			<Display
				makeGuess = {this.makeGuess}
				guesses = {this.state.guesses}
				display = {this.state.display}
				guessesRemaining = {this.state.guessesRemaining}
				gameOn = {this.state.gameOn}
				gameWin = {this.state.gameWin}
				gameReset = {this.gameReset}/>
			</div>
		);
	}
}

export default Hangman;