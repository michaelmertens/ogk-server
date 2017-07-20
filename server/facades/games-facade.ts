import * as express from "express";
import {KingsCupFacade} from "./games/kingscup-facade";

export var router = express.Router(); // get an instance of the express Router
router.get('/kingscup/', KingsCupFacade.getRulebooks);
router.get('/kingscup/:id', KingsCupFacade.getRulebook);
router.post('/kingscup/', KingsCupFacade.addRulebook);
router.put('/kingscup/:id', KingsCupFacade.updateRulebook);
router.delete('/kingscup/:id', KingsCupFacade.removeRulebook);