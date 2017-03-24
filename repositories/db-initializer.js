"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kingscupRepo = require("./games/kingscup-repo");
const Log4js = require("log4js");
const Q = require("q");
const app_config_1 = require("./../app-config");
let logger = Log4js.getLogger("[ogk] [db initializer]");
var mongoose = require('mongoose');
var db;
function initConnection() {
    return Q.Promise((resolve, reject) => {
        mongoose.Promise = Q.Promise;
        mongoose.connect(app_config_1.default.DB_CONNECTIONSTRING);
        db = mongoose.connection;
        db.on('error', function (err) {
            logger.error('database connection error: ' + err);
            reject(err);
        });
        db.once('open', function () {
            kingscupRepo.initializeSchema();
            logger.info("DB initialized");
            resolve("DB connected");
        });
    });
}
exports.initConnection = initConnection;
function closeDBConnections() {
    return Q.Promise((resolve, reject) => {
        logger.info("Closing all DB Connections");
        mongoose.disconnect((err) => {
            if (err) {
                logger.info("Close error");
                logger.error("Problem closing DB Connection: " + err);
                reject(err);
            }
            resolve("Resolve as the process received a SIGINT");
        });
    });
}
exports.closeDBConnections = closeDBConnections;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcmllcy9kYi1pbml0aWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUFzRDtBQUN0RCxpQ0FBaUM7QUFDakMsdUJBQXVCO0FBQ3ZCLGdEQUF3QztBQUV4QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDeEQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLElBQUksRUFBRSxDQUFDO0FBRVA7SUFDSSxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQzdCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM3QixRQUFRLENBQUMsT0FBTyxDQUFDLG9CQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNoRCxFQUFFLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUV6QixFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUc7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNaLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5QixPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFoQkQsd0NBZ0JDO0FBRUQ7SUFDSSxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMxQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRztZQUNwQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixDQUFDO1lBQ0QsT0FBTyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFaRCxnREFZQyIsImZpbGUiOiJyZXBvc2l0b3JpZXMvZGItaW5pdGlhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBraW5nc2N1cFJlcG8gZnJvbSAnLi9nYW1lcy9raW5nc2N1cC1yZXBvJztcclxuaW1wb3J0ICogYXMgTG9nNGpzIGZyb20gJ2xvZzRqcyc7XHJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XHJcbmltcG9ydCBhcHBDb25maWcgZnJvbSBcIi4vLi4vYXBwLWNvbmZpZ1wiO1xyXG5cclxubGV0IGxvZ2dlciA9IExvZzRqcy5nZXRMb2dnZXIoXCJbb2drXSBbZGIgaW5pdGlhbGl6ZXJdXCIpO1xyXG52YXIgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG52YXIgZGI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdENvbm5lY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gUS5Qcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xyXG4gICAgICAgIG1vbmdvb3NlLlByb21pc2UgPSBRLlByb21pc2U7XHJcbiAgICAgICAgbW9uZ29vc2UuY29ubmVjdChhcHBDb25maWcuREJfQ09OTkVDVElPTlNUUklORyk7XHJcbiAgICAgICAgZGIgPSBtb25nb29zZS5jb25uZWN0aW9uO1xyXG5cclxuICAgICAgICBkYi5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcignZGF0YWJhc2UgY29ubmVjdGlvbiBlcnJvcjogJyArIGVycik7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRiLm9uY2UoJ29wZW4nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGtpbmdzY3VwUmVwby5pbml0aWFsaXplU2NoZW1hKCk7XHJcbiAgICAgICAgICAgIGxvZ2dlci5pbmZvKFwiREIgaW5pdGlhbGl6ZWRcIik7XHJcbiAgICAgICAgICAgIHJlc29sdmUoXCJEQiBjb25uZWN0ZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VEQkNvbm5lY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIFEuUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcclxuICAgICAgICBsb2dnZXIuaW5mbyhcIkNsb3NpbmcgYWxsIERCIENvbm5lY3Rpb25zXCIpO1xyXG4gICAgICAgIG1vbmdvb3NlLmRpc2Nvbm5lY3QoKGVycik9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGxvZ2dlci5pbmZvKFwiQ2xvc2UgZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICBsb2dnZXIuZXJyb3IoXCJQcm9ibGVtIGNsb3NpbmcgREIgQ29ubmVjdGlvbjogXCIgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzb2x2ZShcIlJlc29sdmUgYXMgdGhlIHByb2Nlc3MgcmVjZWl2ZWQgYSBTSUdJTlRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIuLiJ9
