import * as Q from 'q';
import * as Log4js from 'log4js';
import * as mongoose from "mongoose";
import * as errorService from '../../services/error-service';
import errorCodes from '../../shared/error-codes';
import { IKingsCupRulebook } from "../../../public/src/models/api-contracts/kingscup";

var KingsCupRulebookModel;

export function initializeSchema() {
    KingsCupRulebookModel = mongoose.model('KingsCupRulebook', KingsCupRulebookSchema);
}

// GETTERS
export function getById(id: string) {
    return Q.Promise(function (resolve, reject) {
        KingsCupRulebookModel.findById(id, {"__v":0})
            .exec((err, result: IKingsCupRulebook)=> {
                if (err) {
                    reject(err);
                } else if (!result) {
                    reject(errorService.createErrorMessage(errorCodes.ERROR_NOT_FOUND))
                } else {
                    resolve(result);
                }
            });
    })
}

export function getByKey(key: string) {
    return Q.Promise(function (resolve, reject) {
        KingsCupRulebookModel.find({'id': key}, {"__v":0})
            .exec((err, result: IKingsCupRulebook)=> {
                if (err) {
                    reject(err);
                } else if (!result) {
                    reject(errorService.createErrorMessage(errorCodes.ERROR_NOT_FOUND))
                } else {
                    resolve(result);
                }
            });
    })
}

export function getAll() {
    return Q.Promise((resolve, reject) => {
        KingsCupRulebookModel.find({})
            .exec((err, results: any[])=> {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
    })
};

// MODIFIERS
export function create(rulebook: IKingsCupRulebook) {
    let obj = new KingsCupRulebookModel(rulebook);
    return Q.ninvoke(obj, "save")
        .then((result)=>{
            return result[0];
        });
}

export function update(rulebook: IKingsCupRulebook) {
    return Q.ninvoke(rulebook, "save")
        .then((result)=> {
            return result[0].toObject();
        });
}

// REMOVE
export function remove(rulebook:IKingsCupRulebook) {
    return Q.Promise(function (resolve, reject) {
        KingsCupRulebookModel.findByIdAndRemove(rulebook.key)
            .exec((err, result)=> {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
}

// SCHEMA
export var KingsCupRulebookSchema = new mongoose.Schema({
    id: {type: String, indexed: true},
    name: {type: String},
    author: {type: String},
    description: {type: String},
    readonly: {type: Boolean},

    rule1: {type: String},
    rule2: {type: String},
    rule3: {type: String},
    rule4: {type: String},
    rule5: {type: String},
    rule6: {type: String},
    rule7: {type: String},
    rule8: {type: String},
    rule9: {type: String},
    rule10: {type: String},
    rule11: {type: String},
    rule12: {type: String},
    rule13: {type: String},
},
{
    timestamps: true
});