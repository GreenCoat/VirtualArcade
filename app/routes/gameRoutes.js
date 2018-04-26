const express = require('express');
const router = express.Router();
// We import our game schema
import Models from '../models/';
// Get all the games sorted by postDate
const getGames = (req, res) => {
    // Query the db, if no errors send all the games to the client
    Models.Game.find(null, null, { sort: { postDate : 1 } }, (err, games) => {
        if (err) {
            res.send(err);
        }
        res.json(games); // Games sent as json
    });
}

// Get a single game filtered by ID
const getGame = (req, res) => {
    const { id } = req.params;
    // Query the db for a single game, if no errors send it to the client
    Models.Game.findById(id, (err, game) => {
        if (err) {
            res.send(err);
        }
        res.json(game); // Game sent as json
    });
}


router.route('/games')
    .get(getGames);
router.route('/games/:id')
    .get(getGame);

// We export our functions to be used in the server routes
module.exports = router; 