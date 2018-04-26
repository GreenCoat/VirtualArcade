import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Game extends PureComponent {
   
  render () {
    const { _id, i, name, game, description, picture, toggleModal, playGame} = this.props;
    const url = "games/"+game;
    return (
      <div className="col-md-4">
        <div className="thumbnail">
          <div className="thumbnail-frame">
            <img src={picture} alt="..." className="img-responsive thumbnail-pic" />
          </div>
          <div className="caption">
            <h5>{name}</h5>
            <p className="description-thumbnail">{`${description.substring(0, 150)}...`}</p>
            <div className="btn-group" role="group" aria-label="...">
              <button className="va-btn" style={{fontFamily: "'Press Start 2P', monospace", fontSize: "12px", color: "lime", border: "1px solid lime", padding: "5px", margin: "5px"}} role="button" onClick={() => toggleModal(i)}>View</button>
             <Link to={url} style={{fontFamily: "'Press Start 2P', monospace", fontSize: "12px", color: "red", border: "1px solid red", padding: "5px", margin: "5px", display: "inline-block"}} role="button">Play</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
