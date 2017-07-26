import * as express from "express";
import * as session from 'express-session';
import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { AuthFacade } from './server/facades/auth-facade';
import { GamesFacade } from './server/facades/games-facade';
import { EventsFacade } from './server/facades/events-facade';
import { NewsFacade } from './server/facades/news-facade';
import * as dbInitializer from './server/repositories/db-initializer';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as log4js from 'log4js';
import * as cors from 'cors';
import appConfig from './server/app-config';
import appSecurity from './server/app-security';

var logger = log4js.getLogger('[ogk] [index]');
var app = express();
var mongodb = require('mongodb'),
    mongoClient = mongodb.MongoClient,
    ObjectID = mongodb.ObjectID, // Used in API endpoints
    db; // We'll initialize connection below

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);


// middleware to use for all API requests
app.use(function (req, res, next) {
    // do logging
    logger.info(req.method + " " + req.url);
    next();
});

// SECURITY CONFIGURATION
// =============================================================================
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use((req, res, next) => {
    if (appConfig.isDev) {
        var originHeader = req.get('origin');
        if (originHeader) {
            var matches = originHeader.match(/^((http|https):\/\/localhost:([0-9]{4}))(.*)/);

            if (matches && matches.length > 1) {
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header("Access-Control-Allow-Origin", matches[1]);
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE, PATCH");
            }
        }
    }
    next();
});
let sessionCookieConfig: any = {
    maxAge: 3600000 * 24 * 21 // 21 days
};
if (appConfig.isDev) {
    logger.warn("Local development mode");
} else {
    sessionCookieConfig.secure = true;
    app.use(appSecurity.forceSsl);
}

app.use(cookieParser());
app.use(session({
    secret: appConfig.SESSION_SECRET,
    proxy: true,
    cookie: sessionCookieConfig,
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        
        return done(null, {
            email: "developer@ogk.be",
            firstName: "developmer"
        });
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user); // TODO: Retrieve user data from database instead of saving to session
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// APPLICATION
// =============================================================================
app.use(express.static(path.join(__dirname, '/public/dist')));

// Error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: (app.get('env') === 'development' ? err : {})
    });
    next(err);
});

// ROUTES FOR OUR API
// =============================================================================
// authentication required beyond this point
app.all('/api*',
    AuthFacade.jwtCheck,
    function (req, res, next) {
        if (!req.user['https://guldenkano.herokuapps.com/member-id']) return res.send(401);
        req.user.memberId = req.user['https://guldenkano.herokuapps.com/member-id'];
        next();
    });
//app.all('/api*', AuthFacade.requireAuthentication);

// more routes for our API will happen here
app.use('/api/auth', AuthFacade.router);
app.use('/api/events', EventsFacade.router);
app.use('/api/games', GamesFacade.router);
app.use('/api/news', NewsFacade.router);

app.get('*', function(req,res,next) {
    res.sendFile(__dirname + '/public/dist/index.html');
});

// 
// Start application and initialize DB Connection
// =============================================================================
app.listen(app.get('port'), function () {
    dbInitializer.initConnection()
        .then(() => {
            logger.info(`OGK is now running on port ${app.get('port')}!`);
        });
});

process.on('SIGINT', function () {
    dbInitializer.closeDBConnections();
    process.exit(0);
});
