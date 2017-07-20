// load the things we need
import * as Q from "Q";
import * as mongoose from "mongoose";
var UserModel;

// create the model for users and expose it to our app
export function initializeSchema() {
    UserModel = mongoose.model('User', userSchema);
}

export function getUserByEmail(email: string) {
    return Q.Promise(function (resolve, reject) {
        UserModel.findOne({ "email": email }, {"__v":0})
            .exec((err, rulebook: User)=> {
                if (err) {
                    reject(err);
                } else {
                    resolve(rulebook);
                }
            });
    });
}

export class User {

}

// define the schema for our user model
var userSchema = new mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});