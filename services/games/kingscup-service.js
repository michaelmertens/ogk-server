"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const Log4js = require("log4js");
const errorService = require("../../services/error-service");
const kingsCupRepo = require("../../repositories/games/kingscup-repo");
const error_codes_1 = require("../../shared/error-codes");
const logger = Log4js.getLogger('[ogk] [kingscup service]');
// GETTERS
function getRulebook(id) {
    return kingsCupRepo.getById(id);
}
exports.getRulebook = getRulebook;
function getRulebooks() {
    return kingsCupRepo.getAll();
}
exports.getRulebooks = getRulebooks;
// MODIFIERS
function addRulebook(rulebook, user) {
    rulebook.author = user.nameId;
    rulebook.key = calcIdFromName(rulebook.name);
    return Q.Promise((resolve, reject) => {
        if (!rulebook.key) {
            reject(errorService.createErrorMessage(error_codes_1.default.ERROR_BAD_REQUEST));
            return;
        }
        kingsCupRepo.getByKey(rulebook.key)
            .then(() => {
            reject(errorService.createErrorMessage(error_codes_1.default.ERROR_BAD_REQUEST, "KEY_ALREADY_EXISTS"));
        })
            .catch((err) => {
            if (errorService.isCustomError(err) && err.error.key === error_codes_1.default.ERROR_NOT_FOUND) {
                kingsCupRepo.create(rulebook).then((result) => {
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
            }
            else {
                reject(errorService.createErrorMessage(error_codes_1.default.ERROR_SERVICE_FAILURE));
            }
        });
    });
}
exports.addRulebook = addRulebook;
function updateRulebook(update, user) {
    return kingsCupRepo.getById(update.key)
        .then((current) => {
        if (!canUpdateRulebook(current, user)) {
            throw errorService.createErrorMessage(error_codes_1.default.ERROR_NOT_AUTHORIZED);
        }
        return kingsCupRepo.update(update);
    });
}
exports.updateRulebook = updateRulebook;
function removeRulebook(rulebook, user) {
    return kingsCupRepo.remove(rulebook);
}
exports.removeRulebook = removeRulebook;
/**
 * Helpers
 */
function calcIdFromName(name) {
    return name.toLowerCase().replace(/[^0-9a-zA-Z]/g, '').substr(0, 50);
}
function canUpdateRulebook(item, user) {
    return user.isAdmin || item.author === user.nameId;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dhbWVzL2tpbmdzY3VwLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1QkFBdUI7QUFDdkIsaUNBQWlDO0FBQ2pDLDZEQUE2RDtBQUM3RCx1RUFBdUU7QUFHdkUsMERBQWtEO0FBR2xELE1BQU0sTUFBTSxHQUFXLE1BQU0sQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUVwRSxVQUFVO0FBQ1YscUJBQTRCLEVBQVU7SUFDbEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUZELGtDQUVDO0FBRUQ7SUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFGRCxvQ0FFQztBQUVELFlBQVk7QUFDWixxQkFBNEIsUUFBMEIsRUFBRSxJQUFrQjtJQUN0RSxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDOUIsUUFBUSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLHFCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO1lBQ3JFLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDOUIsSUFBSSxDQUFDO1lBQ0YsTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBVSxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUNoRyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHO1lBQ1AsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxxQkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xGLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtvQkFDdEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHO29CQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUM5RSxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUF6QkQsa0NBeUJDO0FBRUQsd0JBQStCLE1BQXdCLEVBQUUsSUFBa0I7SUFDdkUsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNsQyxJQUFJLENBQUMsQ0FBQyxPQUF5QjtRQUM1QixFQUFFLENBQUEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxZQUFZLENBQUMsa0JBQWtCLENBQUMscUJBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFSRCx3Q0FRQztBQUVELHdCQUErQixRQUEwQixFQUFFLElBQWtCO0lBQ3pFLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFGRCx3Q0FFQztBQUVEOztHQUVHO0FBQ0gsd0JBQXdCLElBQVk7SUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUVELDJCQUEyQixJQUFzQixFQUFFLElBQWtCO0lBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN2RCxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL2dhbWVzL2tpbmdzY3VwLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xyXG5pbXBvcnQgKiBhcyBMb2c0anMgZnJvbSAnbG9nNGpzJztcclxuaW1wb3J0ICogYXMgZXJyb3JTZXJ2aWNlIGZyb20gJy4uLy4uL3NlcnZpY2VzL2Vycm9yLXNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBraW5nc0N1cFJlcG8gZnJvbSAnLi4vLi4vcmVwb3NpdG9yaWVzL2dhbWVzL2tpbmdzY3VwLXJlcG8nO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwibG9nNGpzXCI7XHJcbmltcG9ydCB7IEtpbmdzQ3VwUnVsZWJvb2sgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbnRyYWN0cy9nYW1lcy1jb250cmFjdFwiO1xyXG5pbXBvcnQgZXJyb3JDb2RlcyBmcm9tICcuLi8uLi9zaGFyZWQvZXJyb3ItY29kZXMnO1xyXG5pbXBvcnQgeyBJVXNlclNlc3Npb24gfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbnRyYWN0cy91c2VyLWNvbnRyYWN0XCI7XHJcblxyXG5jb25zdCBsb2dnZXI6IExvZ2dlciA9IExvZzRqcy5nZXRMb2dnZXIoJ1tvZ2tdIFtraW5nc2N1cCBzZXJ2aWNlXScpO1xyXG5cclxuLy8gR0VUVEVSU1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UnVsZWJvb2soaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGtpbmdzQ3VwUmVwby5nZXRCeUlkKGlkKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJ1bGVib29rcygpIHtcclxuICAgIHJldHVybiBraW5nc0N1cFJlcG8uZ2V0QWxsKCk7XHJcbn1cclxuXHJcbi8vIE1PRElGSUVSU1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkUnVsZWJvb2socnVsZWJvb2s6IEtpbmdzQ3VwUnVsZWJvb2ssIHVzZXI6IElVc2VyU2Vzc2lvbikge1xyXG4gICAgcnVsZWJvb2suYXV0aG9yID0gdXNlci5uYW1lSWQ7XHJcbiAgICBydWxlYm9vay5rZXkgPSBjYWxjSWRGcm9tTmFtZShydWxlYm9vay5uYW1lKTtcclxuXHJcbiAgICByZXR1cm4gUS5Qcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBpZiAoIXJ1bGVib29rLmtleSkge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3JTZXJ2aWNlLmNyZWF0ZUVycm9yTWVzc2FnZShlcnJvckNvZGVzLkVSUk9SX0JBRF9SRVFVRVNUKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBraW5nc0N1cFJlcG8uZ2V0QnlLZXkocnVsZWJvb2sua2V5KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3JTZXJ2aWNlLmNyZWF0ZUVycm9yTWVzc2FnZShlcnJvckNvZGVzLkVSUk9SX0JBRF9SRVFVRVNULCBcIktFWV9BTFJFQURZX0VYSVNUU1wiKSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JTZXJ2aWNlLmlzQ3VzdG9tRXJyb3IoZXJyKSAmJiBlcnIuZXJyb3Iua2V5ID09PSBlcnJvckNvZGVzLkVSUk9SX05PVF9GT1VORCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbmdzQ3VwUmVwby5jcmVhdGUocnVsZWJvb2spLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yU2VydmljZS5jcmVhdGVFcnJvck1lc3NhZ2UoZXJyb3JDb2Rlcy5FUlJPUl9TRVJWSUNFX0ZBSUxVUkUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVJ1bGVib29rKHVwZGF0ZTogS2luZ3NDdXBSdWxlYm9vaywgdXNlcjogSVVzZXJTZXNzaW9uKSB7XHJcbiAgICByZXR1cm4ga2luZ3NDdXBSZXBvLmdldEJ5SWQodXBkYXRlLmtleSlcclxuICAgICAgICAudGhlbigoY3VycmVudDogS2luZ3NDdXBSdWxlYm9vayk9PntcclxuICAgICAgICAgICAgaWYoIWNhblVwZGF0ZVJ1bGVib29rKGN1cnJlbnQsIHVzZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclNlcnZpY2UuY3JlYXRlRXJyb3JNZXNzYWdlKGVycm9yQ29kZXMuRVJST1JfTk9UX0FVVEhPUklaRUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBraW5nc0N1cFJlcG8udXBkYXRlKHVwZGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVSdWxlYm9vayhydWxlYm9vazogS2luZ3NDdXBSdWxlYm9vaywgdXNlcjogSVVzZXJTZXNzaW9uKSB7XHJcbiAgICByZXR1cm4ga2luZ3NDdXBSZXBvLnJlbW92ZShydWxlYm9vayk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIZWxwZXJzXHJcbiAqL1xyXG5mdW5jdGlvbiBjYWxjSWRGcm9tTmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXjAtOWEtekEtWl0vZywgJycpLnN1YnN0cigwLCA1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhblVwZGF0ZVJ1bGVib29rKGl0ZW06IEtpbmdzQ3VwUnVsZWJvb2ssIHVzZXI6IElVc2VyU2Vzc2lvbik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHVzZXIuaXNBZG1pbiB8fCBpdGVtLmF1dGhvciA9PT0gdXNlci5uYW1lSWQ7XHJcbn0iXSwic291cmNlUm9vdCI6Ii4uXFwuLiJ9
