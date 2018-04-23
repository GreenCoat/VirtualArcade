import React, { PureComponent } from 'react';
//Add game to this list to use
import { Hangman, TTT, Pong } from '../games'

export default class DisplayGame extends PureComponent {
  render () {
    //Add game with matching url to components object to dynamically call
  	const components = {
  		hangman: Hangman,
  		ttt: TTT,
        pong : Pong
  	}
  	const Game = components[this.props.params.game];
    return (
      	<Game />
    );
  }
}