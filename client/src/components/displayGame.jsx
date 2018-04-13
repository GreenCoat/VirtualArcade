import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import ttt from "./ttt"

export default class displayGame extends PureComponent {
  render () {
      if (!this.state.game){
          return null;
      }
    return (
      <div className="" id="gameHolder">
 <ttt/>
</div>
    );
  }
}