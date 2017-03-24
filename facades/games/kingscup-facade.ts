import {Request, Response} from "express-serve-static-core";
import * as authService from '../../services/auth-service';
import * as kingsCupService from '../../services/games/kingscup-service';
import {handleErrors} from "../../services/error-service";
import * as Log4js from 'log4js';
import { Logger } from "log4js";
import { KingsCupRulebook } from "../../shared/contracts/games-contract";
import { IUserSession } from "../../shared/contracts/user-contract";

const logger: Logger = Log4js.getLogger('[ogk] [kingscup facade]');

export class KingsCupFacade {

    static getRulebook(req: Request, res: Response) {
        let id = req.params.id;
        kingsCupService.getRulebook(id)
            .then((result) => {
                res.send(result);
            })
            .catch(handleErrors(res, logger))
            .done();
    }

    static getRulebooks(req: Request, res: Response) {
        kingsCupService.getRulebooks()
            .then((result) => {
                res.send({
                    _embedded: {
                        rulebooks: result
                    }
                });
            })
            .catch(handleErrors(res, logger))
            .done();
    }

    static addRulebook(req: Request, res: Response) {
        let rulebook: KingsCupRulebook = req.body;
        
        authService.getAuthenticatedUser(req)
            .then((user: IUserSession) => {
                return kingsCupService.addRulebook(rulebook, user);
            })
            .catch(handleErrors(res, logger))
            .done();
    }

    static updateRulebook(req: Request, res: Response) {
        let id = req.params.id;
        let rulebook: KingsCupRulebook = req.body;

        authService.getAuthenticatedUser(req)
            .then((user: IUserSession) => {
                return kingsCupService.updateRulebook(rulebook, user);
            })
            .then(result => res.send(result))
            .catch(handleErrors(res, logger))
            .done();

    }
    
    static removeRulebook(req: Request, res: Response) {
        let id = req.params.id;
        let rulebook: KingsCupRulebook = req.body;

        authService.getAuthenticatedUser(req)
            .then((user: IUserSession) => kingsCupService.removeRulebook(rulebook, user))
            .then(result => res.send('Rulebook deleted'))
            .catch(handleErrors(res, logger))
            .done();
    }

}