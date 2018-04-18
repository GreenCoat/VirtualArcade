import React, { PureComponent } from 'react';
import { Link } from 'react-router';
//Add game to this list to use
import { Hangman, TTT, Snake } from '../games'

export default class DisplayGame extends PureComponent {
  render () {
    //Add game with matching url to components object to dynamically call
  	const components = {
  		hangman: Hangman,
  		ttt: TTT,
      snake: Snake
  	}
  	const Game = components[this.props.params.game];
    return (
        <div>
      	<Game />
        <Link to="/games">Return to games</Link>
        </div>
    );
  }
}