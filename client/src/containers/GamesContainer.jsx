import axios from 'axios';
import React, { Component } from 'react';
import { Modal, GamesListManager } from '../components';

export default class GamesContainer extends Component {
  constructor (props) {
    super(props);
    // The initial state
    this.state = { games: [], selectedGame: {}, searchBar: '' };
    // Bind the functions to this (context) 
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
    this.playGame = this.playGame.bind(this);
  }

  // Once the component mounted it fetches the data from the server
  componentDidMount () {
    this.getGames();
  }

  toggleModal (index) {
    this.setState({ selectedGame: this.state.games[index] });
    // Since we included bootstrap we can show our modal through its syntax
    $('#game-modal').modal();
  }

  getGames () {
    axios.get('http://localhost:8080/games')
    .then(response => 
    this.setState({ games: response.data}))
  }

    playGame (index) {
    console.log("working")
    this.setState({ selectedGame: this.state.games[0] });
    // Since we included bootstrap we can show our modal through its syntax
    $('#game-modal').modal();
  }

  setSearchBar (event) { 
    // Super still filters super mario thanks to toLowerCase
    this.setState({ searchBar: event.target.value.toLowerCase() });
  }

  render () {
    const { games, selectedGame, searchBar } = this.state;
    return (
      <div>
        <Modal game={selectedGame} />
        <GamesListManager
          games={games}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
         // deleteGame={this.deleteGame}
         playGame={this.playGame}
        />
      </div>
    );
  }
}