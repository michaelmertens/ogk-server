// load the things we need
import * as Q from 'q';
import * as mongoose from "mongoose";
import { Member } from "../../public/src/models/member";
import * as errorService from '../services/error-service';
import errorCodes from '../shared/error-codes';
var MemberModel;

// create the model for users and expose it to our app
export function initializeSchema() {
    MemberModel = mongoose.model('Member', memberSchema);
}


// GETTERS
export function getById(id: string) {
    return Q.Promise(function (resolve, reject) {
        MemberModel.findById(id, {"__v":0})
            .exec((err, result: Member)=> {
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

export function getMemberByEmail(email: string) {
    return Q.Promise(function (resolve, reject) {
        MemberModel.findOne({ "email": email }, {"__v":0})
            .exec((err, member: Member)=> {
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
            .exec((err, results: any[])=> {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
    })
};

// MODIFIERS
export function create(member: Member) {
    let obj = new MemberModel(member);
    return Q.ninvoke(obj, "save")
        .then((result)=>{
            return result[0];
        });
}

export function update(member: Member) {
    return Q.ninvoke(member, "save")
        .then((result)=> {
            return result[0].toObject();
        });
}

// define the schema for our user model
var memberSchema = new mongoose.Schema({
    local            : {
        id           : String,
        email        : String,
        firstName    : String,
        lastName     : String,
        password     : String,
        birthday     : String,
        phoneNumber  : String,
        address      : String,
        iban         : String,
    }
});