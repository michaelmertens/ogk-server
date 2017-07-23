import * as Q from 'q';
import * as Log4js from 'log4js';
import * as errorService from '../../services/error-service';
import * as kingsCupRepo from '../../repositories/games/kingscup-repo';
import { Logger } from "log4js";
import { IKingsCupRulebook } from "../../../public/src/models/api-contracts/kingscup";
import errorCodes from '../../shared/error-codes';
import { IUserSession } from "../../shared/contracts/user-contract";

const logger: Logger = Log4js.getLogger('[ogk] [kingscup service]');

// GETTERS
export function getRulebook(id: string) {
    return kingsCupRepo.getById(id);
}

export function getRulebooks() {
    return kingsCupRepo.getAll();
}

// MODIFIERS
export function addRulebook(rulebook: IKingsCupRulebook, user: IUserSession) {
    rulebook.author = user.nameId;
    rulebook.key = calcIdFromName(rulebook.name);

    return Q.Promise((resolve, reject) => {
        if (!rulebook.key) {
            reject(errorService.createErrorMessage(errorCodes.ERROR_BAD_REQUEST))
            return;
        }
        kingsCupRepo.getByKey(rulebook.key)
            .then(() => {
                reject(errorService.createErrorMessage(errorCodes.ERROR_BAD_REQUEST, "KEY_ALREADY_EXISTS"));
            })
            .catch((err) => {
                if (errorService.isCustomError(err) && err.error.key === errorCodes.ERROR_NOT_FOUND) {
                    kingsCupRepo.create(rulebook).then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    reject(errorService.createErrorMessage(errorCodes.ERROR_SERVICE_FAILURE));
                }
            });
    });
}

export function updateRulebook(update: IKingsCupRulebook, user: IUserSession) {
    return kingsCupRepo.getById(update.key)
        .then((current: IKingsCupRulebook)=>{
            if(!canUpdateRulebook(current, user)) {
                throw errorService.createErrorMessage(errorCodes.ERROR_NOT_AUTHORIZED);
            }
            return kingsCupRepo.update(update);
        });
}

export function removeRulebook(rulebook: IKingsCupRulebook, user: IUserSession) {
    return kingsCupRepo.remove(rulebook);
}

/**
 * Helpers
 */
function calcIdFromName(name: string): string {
    return name.toLowerCase().replace(/[^0-9a-zA-Z]/g, '').substr(0, 50);
}

function canUpdateRulebook(item: IKingsCupRulebook, user: IUserSession): boolean {
    return user.isAdmin || item.author === user.nameId;
}