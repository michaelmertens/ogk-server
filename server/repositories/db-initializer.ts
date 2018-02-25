import * as kingscupRepo from './games/kingscup-repo';
import * as memberRepo from './member-repo';
import * as Log4js from 'log4js';
import * as Q from 'q';
import appConfig from "./../app-config";

let logger = Log4js.getLogger("[ogk] [db initializer]");
var mongoose = require('mongoose');
var db;

export function initConnection() {
    return Q.Promise((resolve, reject)=> {
        mongoose.Promise = Q.Promise;
        mongoose.connect(appConfig.DB_CONNECTIONSTRING);
        db = mongoose.connection;

        db.on('error', function (err) {
            logger.error('database connection error: ' + err);
            reject(err);
        });
        db.once('open', function () {
            kingscupRepo.initializeSchema();
            memberRepo.initializeSchema();
            logger.info("DB initialized");
            resolve("DB connected");
        });
    })
}

export function closeDBConnections() {
    return Q.Promise((resolve, reject)=> {
        logger.info("Closing all DB Connections");
        mongoose.disconnect((err)=> {
            if (err) {
                logger.info("Close error");
                logger.error("Problem closing DB Connection: " + err);
                reject(err);
            }
            resolve("Resolve as the process received a SIGINT");
        });
    });
}

