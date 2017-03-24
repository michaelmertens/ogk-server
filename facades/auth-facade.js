"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = require('log4js').getLogger('[ogk] [AuthFacade]');
function requireAuthentication(req, res, next) {
    next();
    // if (req.isAuthenticated() || isStaticResource(req)) {
    //     next();
    // } else {
    //     if (req.url.indexOf('/api') > -1) {
    //         res.status(401).send(
    //             errorService.createErrorMessage(errorCodes.ERROR_NOT_AUTHENTICATED)
    //         );
    //     } else {
    //         res.redirect('/login');
    //     }
    // }
}
exports.requireAuthentication = requireAuthentication;
// export function requireAPIKey(req, res, next) {
//     if (appConfig.AUTH_ACCEPTED_API_KEYS.indexOf(req.headers.authapikey) > -1) {
//         next();
//     } else {
//         logger.error("Invalid API key provided.");
//         res.status(403).send("Forbidden.");
//     }
// }
function isStaticResource(req) {
    return req.baseUrl.startsWith('/static/');
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhY2FkZXMvYXV0aC1mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxJQUFJLE1BQU0sR0FBVyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFdkUsK0JBQXNDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7SUFDakYsSUFBSSxFQUFFLENBQUM7SUFFUCx3REFBd0Q7SUFDeEQsY0FBYztJQUNkLFdBQVc7SUFDWCwwQ0FBMEM7SUFDMUMsZ0NBQWdDO0lBQ2hDLGtGQUFrRjtJQUNsRixhQUFhO0lBQ2IsZUFBZTtJQUNmLGtDQUFrQztJQUNsQyxRQUFRO0lBQ1IsSUFBSTtBQUNSLENBQUM7QUFkRCxzREFjQztBQUVELGtEQUFrRDtBQUNsRCxtRkFBbUY7QUFDbkYsa0JBQWtCO0FBQ2xCLGVBQWU7QUFDZixxREFBcUQ7QUFDckQsOENBQThDO0FBQzlDLFFBQVE7QUFDUixJQUFJO0FBRUosMEJBQTBCLEdBQVk7SUFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlDLENBQUMiLCJmaWxlIjoiZmFjYWRlcy9hdXRoLWZhY2FkZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbn0gZnJvbSBcImV4cHJlc3Mtc2VydmUtc3RhdGljLWNvcmVcIjtcclxuaW1wb3J0ICogYXMgZXJyb3JTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL2Vycm9yLXNlcnZpY2UnO1xyXG5pbXBvcnQgZXJyb3JDb2RlcyBmcm9tICcuLi9zaGFyZWQvZXJyb3ItY29kZXMnO1xyXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSBcImxvZzRqc1wiO1xyXG52YXIgbG9nZ2VyOiBMb2dnZXIgPSByZXF1aXJlKCdsb2c0anMnKS5nZXRMb2dnZXIoJ1tvZ2tdIFtBdXRoRmFjYWRlXScpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVBdXRoZW50aWNhdGlvbihyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikge1xyXG4gICAgbmV4dCgpO1xyXG4gICAgXHJcbiAgICAvLyBpZiAocmVxLmlzQXV0aGVudGljYXRlZCgpIHx8IGlzU3RhdGljUmVzb3VyY2UocmVxKSkge1xyXG4gICAgLy8gICAgIG5leHQoKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgaWYgKHJlcS51cmwuaW5kZXhPZignL2FwaScpID4gLTEpIHtcclxuICAgIC8vICAgICAgICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoXHJcbiAgICAvLyAgICAgICAgICAgICBlcnJvclNlcnZpY2UuY3JlYXRlRXJyb3JNZXNzYWdlKGVycm9yQ29kZXMuRVJST1JfTk9UX0FVVEhFTlRJQ0FURUQpXHJcbiAgICAvLyAgICAgICAgICk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgcmVzLnJlZGlyZWN0KCcvbG9naW4nKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiByZXF1aXJlQVBJS2V5KHJlcSwgcmVzLCBuZXh0KSB7XHJcbi8vICAgICBpZiAoYXBwQ29uZmlnLkFVVEhfQUNDRVBURURfQVBJX0tFWVMuaW5kZXhPZihyZXEuaGVhZGVycy5hdXRoYXBpa2V5KSA+IC0xKSB7XHJcbi8vICAgICAgICAgbmV4dCgpO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBsb2dnZXIuZXJyb3IoXCJJbnZhbGlkIEFQSSBrZXkgcHJvdmlkZWQuXCIpO1xyXG4vLyAgICAgICAgIHJlcy5zdGF0dXMoNDAzKS5zZW5kKFwiRm9yYmlkZGVuLlwiKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuZnVuY3Rpb24gaXNTdGF0aWNSZXNvdXJjZShyZXE6IFJlcXVlc3QpIHtcclxuICAgIHJldHVybiByZXEuYmFzZVVybC5zdGFydHNXaXRoKCcvc3RhdGljLycpO1xyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii4uIn0=
