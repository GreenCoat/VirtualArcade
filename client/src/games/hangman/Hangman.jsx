import React from 'react';
import Display from './Display';

class Hangman extends React.Component {
	constructor() {
		super();

	this.makeGuess = (val) => {
		//Set up variables
		let guess = this.state.guesses;
		let word = this.state.word;
		//Cheat to create a copy of display array
		let display = JSON.parse(JSON.stringify(this.state.display));

		//Check if guess has already been tried
		if(guess.indexOf(val) == -1){
			//Check if word contains submitted value
			if(word.indexOf(val) != -1){
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

	this.getWord = () => {
		//Get/make word list
		let words = ['Foobar', 'Orange', 'Potato', 'Katana', 'Scimitar', 'Apple'];
		//Get random word from list
		let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
		//Return word converted to an array
		return word.split('');
	}

	this.setDisplay = (word) => {
		//Create empty array
		let display = [];

		//Add _ to array for each letter in source
		for(var i = 0; i < word.length; i++){
			display.push('_');
			display.push(' ');
		}
		//Return display array
		return display;
	}

	this.gameReset = () => {
		let word = this.getWord();
		let display = this.setDisplay(word);

		this.setState({word: word, 
				  	   display: display,
				  	   guesses: [],
				  	   guessesRemaining: 7,
				  	   gameOn: true,
				  	   gameWin: null});
	}

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

	render() {
		return (
			<div id="hangman">
			<span style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime"}}>HANGMAN</span>
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