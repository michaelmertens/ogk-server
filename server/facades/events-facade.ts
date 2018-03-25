import {Request, Response} from "express-serve-static-core";
import * as express from "express";
import * as authService from '../services/auth-service';
import * as Log4js from 'log4js';
import {handleErrors} from "../services/error-service";
import { Logger } from "log4js";
import { ICalendarEvent } from "../../public/src/models/api-contracts/event";
const logger: Logger = Log4js.getLogger('[ogk] [events facade]');
const router = express.Router(); 

export class EventsFacade {
    static router = router;
    static _events: ICalendarEvent[] =  [
        {
            id: "1",
            date: new Date(),
            type: '+1',
            status: "CONCEPT",
            owner: "Tom Meyns",
            createdBy: "Tom Meyns",
            title: "Container",
            location: "Mechelsesteenweg",
            attendees: ["TM"],
            description: "Iedereen meer dan welkom om mee nen container te komen vullen. Pintjes staan koud!",
        },
        {
            id: "2",
            date: new Date(),
            type: '+1',
            status: "CANCELLED",
            owner: "Karel Mangeleer",
            createdBy: "Karel Mangeleer",
            title: "Tear down that wall",
            location: "Aan't station",
            attendees: ["KM"],
            description: "Iedereen meer dan welkom om mee ne muur te komen slopen. Pintjes staan koud!",
        },
        {
            id: "3",
            date: new Date(),
            type: '+1',
            status: "CONFIRMED",
            owner: "Michael Mertens",
            createdBy: "Michael Mertens",
            title: "Vlaanderen zingt",
            location: "Oude markt",
            attendees: ["MM","KM","PV"],
            description: "Iedereen meer dan welkom om mee te komen zingen en eventueel een handje te helpen. Pintjes staan koud!",
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