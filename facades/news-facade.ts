import {Request, Response} from "express-serve-static-core";
import * as express from "express";
import * as authService from '../services/auth-service';
import * as Log4js from 'log4js';
import {handleErrors} from "../services/error-service";
import { Logger } from "log4js";
import { OgkEvent } from "../shared/contracts/event-contract";
import { OgkNews } from "../shared/contracts/news-contract";
const logger: Logger = Log4js.getLogger('[ogk] [news facade]');
const router = express.Router(); // get an instance of the express Router

export class NewsFacade {
    static router = router;
    static _newsStories: OgkNews[] =  [
        { date: new Date(), author: "Commissie OGK", title: "Eerste nieuws op onze nieuwe app!", content: "Dit is geweldig." },
        { date: new Date(), author: "Commissie OGK", title: "Bestemming eerste weekend ligt vast!", content: "Kijken jullie er ook al naar uit?" }
    ];

    static getNewsStories(req: Request, res: Response) {
        let id = req.params.id;

        res.send({
            _embedded: {
                events: NewsFacade._newsStories
            }
        });
    }
}

// router config
router.get('/', NewsFacade.getNewsStories);