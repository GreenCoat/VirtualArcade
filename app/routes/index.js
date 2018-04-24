const express = require('express');

const router = express.Router();
// add API routes to current router
// NOTE: API routes must be added first, because htmlRoutes has a wildcard route
// which will swallow anything that isn't matched first
// NOTE: All routes exported from apiRoutes will get placed under the /api path
// this is just to save a little typing so in my api routes I don't have to put
// /api in front of each route.
router.use('/api', require('./userRoutes'));

// add catch all route to current router
// router.route("*").get((req, res) => {
//   res.sendFile('client/dist/index.html', { root: __dirname });
// });

module.exports = router;