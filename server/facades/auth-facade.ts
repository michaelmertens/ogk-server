import { Request, Response, NextFunction } from "express-serve-static-core";
import * as express from "express";
import * as errorService from '../services/error-service';
import errorCodes from '../shared/error-codes';
import { Logger } from "log4js";
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const logger: Logger = require('log4js').getLogger('[ogk] [AuthFacade]');

const router = express.Router();

export class AuthFacade {
    static router = router;
    static jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: "https://guldenkano.eu.auth0.com/.well-known/jwks.json"
        }),
        audience: 'https://guldenkano.herokuapp.com',
        issuer: "https://guldenkano.eu.auth0.com/",
        algorithms: ['RS256']
    });

    static login(req: Request, res: Response) {
        let id = req.params.id;

        res.send({
        });
    }
}

// router config
router.post('/login', AuthFacade.login);

export function requireAuthentication(req: Request, res: Response, next: NextFunction) {
    next();

    // if (req.isAuthenticated() || isStaticResource(req)) {
    //     next();
    // } else {
    //     if (req.url.indexOf('/api') > -1) {
    //         res.status(401).send(
    //             errorService.createErrorMessage(errorCodes.ERROR_NOT_AUTHENTICATED)
    //         );
    //     } else {
    //         res.redirect('/login');
    //     }
    // }
}

// export function requireAPIKey(req, res, next) {
//     if (appConfig.AUTH_ACCEPTED_API_KEYS.indexOf(req.headers.authapikey) > -1) {
//         next();
//     } else {
//         logger.error("Invalid API key provided.");
//         res.status(403).send("Forbidden.");
//     }
// }

function isStaticResource(req: Request) {
    return req.baseUrl.startsWith('/static/');
}