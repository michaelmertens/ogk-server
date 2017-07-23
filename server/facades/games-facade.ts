import * as express from "express";
import {KingsCupFacade} from "./games/kingscup-facade";
const router = express.Router(); 

export class GamesFacade {
    static router = router;
}
  
router.get('/kingscup/', KingsCupFacade.getRulebooks);
router.get('/kingscup/:id', KingsCupFacade.getRulebook);
router.post('/kingscup/', KingsCupFacade.addRulebook);
router.put('/kingscup/:id', KingsCupFacade.updateRulebook);
router.delete('/kingscup/:id', KingsCupFacade.removeRulebook);