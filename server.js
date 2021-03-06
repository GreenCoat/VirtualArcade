// # Import all dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// # Import models and routes
import Models from './app/models';

// # Using the express server app and listen to the port 8080
const app = express(); 
const port = process.env.PORT || 8080;

// # Setup Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
  console.log('CORS ' + req.session);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type, *");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//Set up passport
require('./passport')(app);

// #Set up routes
app.use(require('./app/routes'));

// # Setup database connection using Mongoose

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
}; // Just a bunch of options for the db connection

//Set up mongo for environment or local
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gamearcade_db";
mongoose.Promise = global.Promise;

mongoose.connect(MONGODB_URI, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// # Database creation

let data = [{
        name: "Hangman",
        game: "hangman",
        year: 1800,
        description: "Hangman is a simple and fun game. There is a secret word which are revealed only the first and last letters, in each round of game the player chooses a letter of the alphabet, if the letter is contained in the secret word it will appear, otherwise the player will receive a penalty and gradually a poor little man will be hanged. The aim of the game is to compose the secret word before the man is completely hung.",
        picture: "https://cdn.filestackcontent.com/LUNmWNIfSrKyfTJw2SrL",

},{
        name: "Tic-Tac-Toe",
        game: "ttt",
        year: 1952,
        description: "Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.",
        picture: "https://cdn.filestackcontent.com/0i3gBB8qTgm2HTK04Bx9", 
},{
        name: "Snake",
        game: "snake",
        year: 1976,
        description: "Snake is the common name for a video game concept where the player maneuvers a line which grows in length, with the line itself being a primary obstacle.",
        picture: "http://www.coolmath-games.com/sites/cmatgame/files/snake.png"
},
  {
        name: "Pong",
        game: "pong",
        year: 1972,
        description: "Pong is one of the earliest arcade video games. It is a table tennis sports game featuring simple two-dimensional graphics.",
        picture: "https://cdn.filestackcontent.com/CB1Ay5MYSGmvu1nRLAms", 
},
{
        name: "Asteroids",
        game: "asteroids",
        year: 1979,
        description: "The player controls a spaceship in an asteroid field which is periodically traversed by flying saucers. The object of the game is to shoot and destroy asteroids and saucers while not colliding with either or being hit by the saucers' counter-fire. The game becomes harder as the number of asteroids increases.",
        picture: "https://i.imgur.com/HrcQ5wS.png", 
}];

for (let i=0; i< data.length; i++){
    Models.Game.findOneAndUpdate(
      data[i], data[i], {upsert:true}, function(err, doc){
      return "DB Added" ;
    });    
}

app.listen(port);

console.log(`listening on port ${port}`);










