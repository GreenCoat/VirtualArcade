// # Import all dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// # Import models and routes
//let Game = mongoose.model('Game');
import Models from './app/models';
import { getGames, getGame, postGame, playGame } from './app/routes/game';

// # Using the express server ap and listen to the port 8080
const app = express(); 
const port = process.env.PORT || 8080;

// # Setup database connection using Mongoose

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
}; // Just a bunch of options for the db connection

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/gamearcade_db", options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// # Database creation

let data = [{
        name: "Hangman",
        game: "hangman",
        year: 1800,
        description: "Hangman is a simple and fun game. There is a secret word which are revealed only the first and last letters, in each round of game the player chooses a letter of the alphabet, if the letter is contained in the secret word it will appear, otherwise the player will receive a penalty and gradually a poor little man will be hanged. The aim of the game is to compose the secret word before the man is completely hung.",
        picture: "https://cdn.filestackcontent.com/BVLUoBW1SwOSwPw1ASpH",

},{
        name: "Tic-Tac-Toe",
        game: "ttt",
        year: 1952,
        description: "Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.",
        picture: "https://cdn.filestackcontent.com/2mHXAFNrSdiPlBzQLHsf", 
},{
        name: "Snake",
        game: "snake",
        year: 1976,
        description: "Snake is the common name for a video game concept where the player maneuvers a line which grows in length, with the line itself being a primary obstacle.",
        picture: "http://www.coolmath-games.com/sites/cmatgame/files/snake.png"
}];

for (let i=0; i< data.length; i++){
    Models.Game.findOneAndUpdate(
      data[i], data[i], {upsert:true}, function(err, doc){
      return "DB Added" ;
    });    
}

//Create a default user for testing
let users = [{
  username: 'Foo',
  password: 'Bar'
}];

for (let i=0; i< users.length; i++){
    Models.User.findOneAndUpdate(
      users[i], users[i], {upsert:true}, function(err, doc){
      return "DB Added" ;
    });
}


// # Setup Middleware

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Tell express to get all static assets

app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// #Set up API routes
app.route('/games')
  // create a game
  .post(postGame)
  // get all the games
  .get(getGames);
app.route('/games/:id')
  // get a single game
  .get(getGame);
  // delete a single game
//  .delete(deleteGame);
app.route('/games/play/:id')
  // play single game by ID
  .get(playGame);
// ...For all the other requests just sends back the Homepage
app.route("*").get((req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname });
});

app.listen(port);

console.log(`listening on port ${port}`);










