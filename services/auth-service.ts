import {Request} from "express-serve-static-core";
import * as errorService from './error-service';
import * as Q from 'q';
import appConfig from '../app-config';
import errorCodes from '../shared/error-codes';
import { IUserSession } from "../shared/contracts/user-contract";

export function isDevelopmentMode() {
    return appConfig.isDev;
}

export function getAuthenticatedUser(req: Request): Q.Promise<IUserSession>{
    if (isDevelopmentMode()) {
        return Q.resolve(developerSession);
    }
    if (req.isAuthenticated()) {
        return Q.resolve(req.user);
    }
    return Q.reject<IUserSession>(errorService.createErrorMessage(errorCodes.ERROR_NOT_AUTHENTICATED));
}

let developerSession: IUserSession = {
    emailAddress: "developer@ogk.be",
    firstName: "developer",
    lastName: "developer",
    nameId: "dev",
    isAdmin: true,
    nickName: "devke"
}