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
              <button className="btn btn-success" role="button" onClick={() => toggleModal(i)}>View</button>
             <Link to={url} className="btn btn-danger" role="button">Play Now</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
