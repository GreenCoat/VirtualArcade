// # Import all dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// # Import models and routes
import Game from './app/models/game';
import { getGames, getGame, postGame, deleteGame } from './app/routes/game';

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
  .get(getGame);
// ...For all the other requests just sends back the Homepage
app.route("*").get((req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname });
});

app.listen(port);

console.log(`listening on port ${port}`);










