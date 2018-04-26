import React, { PureComponent } from 'react';
import { Link } from 'react-router';
//Add game to this list to use
<<<<<<< HEAD
import { Hangman, TTT, Snake, Asteroids } from '../games'
=======
import { Hangman, TTT, Snake, Pong } from '../games'
>>>>>>> master

export default class DisplayGame extends PureComponent {
  render () {
    //Add game with matching url to components object to dynamically call
  	const components = {
  		hangman: Hangman,
  		ttt: TTT,
      snake: Snake,
      asteroids: Asteroids,
      snake: Snake,
      pong : Pong
  	}
  	const Game = components[this.props.params.game];
    return (
        <div>
      	<Game />
        <Link className="va-btn" style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime"}} to="/games">Return</Link>
        </div>
    );
  }
}