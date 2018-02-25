import * as Q from 'q';
import * as Log4js from 'log4js';
import * as errorService from '../services/error-service';
import * as memberRepo from '../repositories/member-repo';
import { Logger } from "log4js";
import { Member } from "../../public/src/models/member";
import errorCodes from '../shared/error-codes';
import { IUserSession } from "../shared/contracts/user-contract";

const logger: Logger = Log4js.getLogger('[ogk] [member service]');

// GETTERS
export function getMember(id: string) {
    return memberRepo.getByKey(id);
}

export function getMembers() {
    return memberRepo.getAll();
}

export function addMembers(members: Member[], user: IUserSession) {
    return Q.Promise((resolve, reject) => {
        if (!user.isAdmin) {
            reject(errorService.createErrorMessage(errorCodes.ERROR_NOT_AUTHORIZED))
            return;
        }

        return resolve(Q.all(members.map((m) => {
            return this.addMember(m, user);
        })));
    });
}

export function addMember(member: Member, user: IUserSession) {
    return Q.Promise((resolve, reject) => {
        if (!member.id) {
            reject(errorService.createErrorMessage(errorCodes.ERROR_BAD_REQUEST))
            return;
        }
        memberRepo.getByKey(member.id)
            .then(() => {
                reject(errorService.createErrorMessage(errorCodes.ERROR_BAD_REQUEST, "KEY_ALREADY_EXISTS"));
            })
            .catch((err) => {
                if (errorService.isCustomError(err) && err.error.id === errorCodes.ERROR_NOT_FOUND) {
                    memberRepo.create(member).then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        reject(memberRepo);
                    });
                } else {
                    reject(errorService.createErrorMessage(errorCodes.ERROR_SERVICE_FAILURE));
                }
            });
    });
}


export function updateMember(update: Member, user: IUserSession) {
    return memberRepo.getByKey(update.id)
        .then((current: Member)=>{
            if(!canUpdateMember(current, user)) {
                throw errorService.createErrorMessage(errorCodes.ERROR_NOT_AUTHORIZED);
            }
            return memberRepo.update(update);
        });
}

// export function removeMember(member: Member, user: IUserSession) {
//     return memberRepo.getByKey(member.id)
//         .then((current: Member)=>{
//             if(!canUpdateMember(current, user)) {
//                 throw errorService.createErrorMessage(errorCodes.ERROR_NOT_AUTHORIZED);
//             }
//             return memberRepo.remove(member);
//         });
// }

/**
 * Helpers
 */
// function calcIdFromName(name: string): string {
//     return name.toLowerCase().replace(/[^0-9a-zA-Z]/g, '').substr(0, 50);
// }

function canUpdateMember(item: Member, user: IUserSession): boolean {
    return user.isAdmin || item.id === user.nameId;
}