var localConfig = require('./local.json');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mongodb = require('mongodb'),
    mongoClient = mongodb.MongoClient,
    ObjectID = mongodb.ObjectID, // Used in API endpoints
    db; // We'll initialize connection below

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static(path.join(__dirname, '/public')));

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: (app.get('env') === 'development' ? err : {})
    });
    next(err);
});

// Initialize database connection and then start the server.
var MONGODB_URI = process.env.MONGODB_URI || localConfig.mongoDbUri;
mongoClient.connect(MONGODB_URI, function (err, database) {
    if (err) {
        process.exit(1);
    }

    db = database; // Our database object from mLab
    console.log("[SERVER] Database connection ready");

    // Initialize the app.
    app.listen(app.get('port'), function () {
        console.log("[SERVER] listening on port ", app.get('port'));
    });
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('[ROUTER] ', req.baseUrl);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);