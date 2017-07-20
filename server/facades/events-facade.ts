import {Request, Response} from "express-serve-static-core";
import * as express from "express";
import * as authService from '../services/auth-service';
import * as Log4js from 'log4js';
import {handleErrors} from "../services/error-service";
import { Logger } from "log4js";
import { OgkEvent } from "../shared/contracts/event-contract";
const logger: Logger = Log4js.getLogger('[ogk] [events facade]');
const router = express.Router(); 

export class EventsFacade {
    static router = router;
    static _events: OgkEvent[] =  [
        {
            date: new Date(),
            owner: "Tom Meyns",
            createdBy: "Tom Meyns",
            title: "Container",
            description: "Iedereen meer dan welkom om mee nen container te komen vullen. Pintjes staan koud!",
            isAnonymous: false
        },
        {
            date: new Date(),
            owner: "Karel Mangeleer",
            createdBy: "Karel Mangeleer",
            title: "Tear down that wall",
            description: "Iedereen meer dan welkom om mee ne muur te komen slopen. Pintjes staan koud!",
            isAnonymous: false
        },
        {
            date: new Date(),
            owner: "Michael Mertens",
            createdBy: "Michael Mertens",
            title: "Vlaanderen zingt",
            description: "Iedereen meer dan welkom om mee te komen zingen en eventueel een handje te helpen. Pintjes staan koud!",
            isAnonymous: false
        }
    ];

    static getEvents(req: Request, res: Response) {
        let id = req.params.id;

        res.send({
            _embedded: {
                events: EventsFacade._events
            }
        });
    }
}

// router config
router.get('/', EventsFacade.getEvents);