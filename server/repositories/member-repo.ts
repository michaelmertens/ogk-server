// load the things we need
import * as Q from 'q';
import * as mongoose from "mongoose";
import { IMember } from "../../public/src/models/api-contracts/members";
import * as errorService from '../services/error-service';
import errorCodes from '../shared/error-codes';
var MemberModel;

// create the model for users and expose it to our app
export function initializeSchema() {
    MemberModel = mongoose.model('Member', MemberSchema);
}


// GETTERS
export function getById(id: string) {
    return Q.Promise(function (resolve, reject) {
        MemberModel.findById(id, {"__v":0})
            .exec((err, result: IMember)=> {
                if (err) {
                    reject(err);
                } else if (!result || (result instanceof Array && result.length === 0)) {
                    reject(errorService.createErrorMessage(errorCodes.ERROR_NOT_FOUND))
                } else {
                    resolve(result);
                }
            });
    })
}

export function getByKey(key: string) {
    return Q.Promise(function (resolve, reject) {
        MemberModel.find({'id': key}, {"__v":0})
            .exec((err, result: IMember[])=> {
                if (err) {
                    reject(err);
                } else if (!result || !result[0]) {
                    reject(errorService.createErrorMessage(errorCodes.ERROR_NOT_FOUND));
                } else {
                    resolve(result[0]);
                }
            });
    })
}

export function getMemberByEmail(email: string) {
    return Q.Promise(function (resolve, reject) {
        MemberModel.findOne({ "email": email }, { "__v": 0 })
            .exec((err, member: IMember) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(member);
                }
            });
    });
}

export function getAll() {
    return Q.Promise((resolve, reject) => {
        MemberModel.find({})
            .exec((err, results: any[]) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
    })
};

// MODIFIERS
export function create(member: IMember) {
    let obj = new MemberModel(member);
    return Q.ninvoke(obj, "save")
        .then((result) => {
            return result[0];
        });
}

export function update(member: IMember) {
    return Q.ninvoke(member, "save")
        .then((result) => {
            return result[0].toObject();
        });
}

// SCHEMA
export var MemberSchema = new mongoose.Schema({
    id: { type: String, indexed: true },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    birthday: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    iban: { type: String },
}, {
    timestamps: true
});