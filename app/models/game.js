// Create database schema for the mongoose DB

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// This will be the schecme to store game information
const gameSchema = new Schema(
    {
        name: String,
        game: String,
        year: Number,
        description: String,
        picture: String,
        postDate : { type: Date, default: Date.now } // This will be the Timestamp

    }
);

// Export the schema to use somewhere else

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;