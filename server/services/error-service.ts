import {Response} from "express-serve-static-core";
import {Logger} from "log4js";
import errorCodes from "../shared/error-codes";
var logger: Logger = require('log4js').getLogger('[ogk] [error handler]');


export class CustomError {
    error: {
        key: string;
        params?: any;
    };

    constructor(key: string, params ?: Array<string>) {
        this.error = {key};
        if (params) {
            this.error.params = params;
        }
    }
}

export function createErrorMessage(key: any, params?: any): CustomError {
    return new CustomError(key, params);
}

export function isCustomError(err) {
    return err && err.error && err.error.key;
}

export function handleErrors(res: Response, sourceLogger?: Logger) {
    return function (err) {
        let errorString = (err && err.message) ? err.message : JSON.stringify(err);
        if (sourceLogger) {
            sourceLogger.error(errorString);
        } else {
            logger.error(errorString);
        }
        if (!res.headersSent) {
            if (isCustomError(err)) {
                displayConstructedErrorToUser(err, res);
            } else {
                showServiceDownMessage(res);
            }
        }
    }
}

function displayConstructedErrorToUser(err:CustomError, res: Response){
    let errorKey = err.error.key;
    switch (errorKey) {
        case errorCodes.ERROR_NOT_AUTHENTICATED:
            res.status(401).send(err);
            break;
        case errorCodes.ERROR_NOT_AUTHORIZED:
            res.status(403).send(err);
            break;
        case errorCodes.ERROR_NOT_FOUND:
            res.status(404).send(err);
            break;
        case errorCodes.ERROR_BAD_REQUEST:
            res.status(404).send(err);
            break;
        default:
            res.status(500).send(err);
            break;
    }
}

function showServiceDownMessage(res: Response){
    res.status(500).send(new CustomError(errorCodes.ERROR_SERVICE_FAILURE));
}