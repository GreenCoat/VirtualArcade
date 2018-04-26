import React, { PureComponent } from 'react';
import { Link } from 'react-router';
//Add game to this list to use
import { Hangman, TTT, Snake, Pong } from '../games'

export default class DisplayGame extends PureComponent {
  render () {
    //Add game with matching url to components object to dynamically call
  	const components = {
  		hangman: Hangman,
  		ttt: TTT,
        snake: Snake,
        pong : Pong
  	}
  	const Game = components[this.props.params.game];
    return (
        <div>
      	<Game />
        <Link className="va-btn" style={{fontFamily: "'Press Start 2P', monospace", fontSize: "24px", color: "lime", margin: "10px"}} to="/games">Return</Link>
        </div>
    );
  }
}