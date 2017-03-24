"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// load the things we need
const Q = require("Q");
const mongoose = require("mongoose");
var UserModel;
// create the model for users and expose it to our app
function initializeSchema() {
    UserModel = mongoose.model('User', userSchema);
}
exports.initializeSchema = initializeSchema;
function getUserByEmail(email) {
    return Q.Promise(function (resolve, reject) {
        UserModel.findOne({ "email": email }, { "__v": 0 })
            .exec((err, rulebook) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rulebook);
            }
        });
    });
}
exports.getUserByEmail = getUserByEmail;
class User {
}
exports.User = User;
// define the schema for our user model
var userSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcmllcy91c2Vycy1yZXBvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQTBCO0FBQzFCLHVCQUF1QjtBQUN2QixxQ0FBcUM7QUFDckMsSUFBSSxTQUFTLENBQUM7QUFFZCxzREFBc0Q7QUFDdEQ7SUFDSSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUZELDRDQUVDO0FBRUQsd0JBQStCLEtBQWE7SUFDeEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtRQUN0QyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxDQUFDO2FBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFjO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBWEQsd0NBV0M7QUFFRDtDQUVDO0FBRkQsb0JBRUM7QUFFRCx1Q0FBdUM7QUFDdkMsSUFBSSxVQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ2pDLEtBQUssRUFBYztRQUNmLEtBQUssRUFBVSxNQUFNO1FBQ3JCLFFBQVEsRUFBTyxNQUFNO0tBQ3hCO0lBQ0QsUUFBUSxFQUFXO1FBQ2YsRUFBRSxFQUFhLE1BQU07UUFDckIsS0FBSyxFQUFVLE1BQU07UUFDckIsS0FBSyxFQUFVLE1BQU07UUFDckIsSUFBSSxFQUFXLE1BQU07S0FDeEI7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoicmVwb3NpdG9yaWVzL3VzZXJzLXJlcG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsb2FkIHRoZSB0aGluZ3Mgd2UgbmVlZFxyXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJRXCI7XHJcbmltcG9ydCAqIGFzIG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xyXG52YXIgVXNlck1vZGVsO1xyXG5cclxuLy8gY3JlYXRlIHRoZSBtb2RlbCBmb3IgdXNlcnMgYW5kIGV4cG9zZSBpdCB0byBvdXIgYXBwXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplU2NoZW1hKCkge1xyXG4gICAgVXNlck1vZGVsID0gbW9uZ29vc2UubW9kZWwoJ1VzZXInLCB1c2VyU2NoZW1hKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBRLlByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIFVzZXJNb2RlbC5maW5kT25lKHsgXCJlbWFpbFwiOiBlbWFpbCB9LCB7XCJfX3ZcIjowfSlcclxuICAgICAgICAgICAgLmV4ZWMoKGVyciwgcnVsZWJvb2s6IFVzZXIpPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJ1bGVib29rKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXIge1xyXG5cclxufVxyXG5cclxuLy8gZGVmaW5lIHRoZSBzY2hlbWEgZm9yIG91ciB1c2VyIG1vZGVsXHJcbnZhciB1c2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgICBsb2NhbCAgICAgICAgICAgIDoge1xyXG4gICAgICAgIGVtYWlsICAgICAgICA6IFN0cmluZyxcclxuICAgICAgICBwYXNzd29yZCAgICAgOiBTdHJpbmcsXHJcbiAgICB9LFxyXG4gICAgZmFjZWJvb2sgICAgICAgICA6IHtcclxuICAgICAgICBpZCAgICAgICAgICAgOiBTdHJpbmcsXHJcbiAgICAgICAgdG9rZW4gICAgICAgIDogU3RyaW5nLFxyXG4gICAgICAgIGVtYWlsICAgICAgICA6IFN0cmluZyxcclxuICAgICAgICBuYW1lICAgICAgICAgOiBTdHJpbmdcclxuICAgIH1cclxufSk7Il0sInNvdXJjZVJvb3QiOiIuLiJ9
