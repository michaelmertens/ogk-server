import * as express from "express";
import { Request, Response } from "express-serve-static-core";
import * as authService from '../services/auth-service';
import * as memberService from '../services/member-service';
import { handleErrors } from "../services/error-service";
import * as Log4js from 'log4js';
import { Logger } from "log4js";
import { Member } from "../../public/src/models/member";
import { IUserSession } from "../shared/contracts/user-contract";
const router = express.Router();

const logger: Logger = Log4js.getLogger('[ogk] [members facade]');

export class MembersFacade {
    static router = router;

    static getMembers(req: Request, res: Response) {
        memberService.getMembers()
            .then((result) => {
                res.send({
                    _embedded: {
                        members: result
                    }
                });
            })
            .catch(handleErrors(res, logger))
            .done();
    }

    static addMember(req: Request, res: Response) {
        let rulebook: Member = req.body;

        authService.getAuthenticatedUser(req)
            .then((user: IUserSession) => {
                return memberService.addMember(rulebook, user);
            })
            .catch(handleErrors(res, logger))
            .done();
    }

    static updateMember(req: Request, res: Response) {
        let id = req.params.id;
        let rulebook: Member = req.body;

        authService.getAuthenticatedUser(req)
            .then((user: IUserSession) => {
                return memberService.updateMember(rulebook, user);
            })
            .then(result => res.send(result))
            .catch(handleErrors(res, logger))
            .done();

    }

    static seed(req: Request, res: Response) {
        const memberCollection = [
            { id: 'MM', firstName: 'Michael', lastName: 'Mertens' },
            { id: 'TM', firstName: 'Tom', lastName: 'Meyns' },
            { id: 'BS', firstName: 'Bernard', lastName: 'Spitz' },
            { id: 'TH', firstName: 'Tom', lastName: 'Hendrix' },
            { id: 'KM', firstName: 'Karel', lastName: 'Mangeleer' },
            { id: 'JV', firstName: 'Jens', lastName: 'Vande Cavey' },
            { id: 'NV', firstName: 'Nico', lastName: 'Vansina' },
            { id: 'VP', firstName: 'Vincent', lastName: 'Pieters' },
            { id: 'EB', firstName: 'Evert', lastName: 'Baeten' },
            { id: 'NR', firstName: 'Neil', lastName: 'Rayyan' },
            { id: 'LA', firstName: 'Ludo', lastName: 'Aelbrecht' }
        ];
        
        authService.getAuthenticatedUser(req)
            .then((user: IUserSession) => {
                return memberService.addMembers(memberCollection, user);
            })
            .then(result => res.send(result))
            .catch(handleErrors(res, logger))
            .done();
    }
}

router.get('/', MembersFacade.getMembers);
// router.get('/:id', MembersFacade.getMember);
router.post('/', MembersFacade.addMember);
router.put('/:id', MembersFacade.updateMember);
router.post('/seed', MembersFacade.seed);
