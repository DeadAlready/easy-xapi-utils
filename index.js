/**
 * Created by karl on 16/07/15.
 */
/// <reference path='typings/tsd.d.ts' />
'use strict';
function isLoggedIn(role) {
    return function checkLoggedIn(req, res, next) {
        if (!req.info || !req.info.isLoggedIn) {
            res.fail('Unauthorized', 401);
            return;
        }
        if (role && req.info.role !== role) {
            res.fail('Forbidden', 403);
            return;
        }
        next();
    };
}
exports.isLoggedIn = isLoggedIn;
function hasRole(role) {
    return function checkRole(req, res, next) {
        if (!req.info) {
            res.fail('Unauthorized', 401);
            return;
        }
        if (req.info.role !== role) {
            res.fail('Forbidden', 403);
            return;
        }
        next();
    };
}
exports.hasRole = hasRole;
function isLoggedOut() {
    return function checkLoggedOut(req, res, next) {
        if (!req.info) {
            res.fail('Unauthorized', 401);
            return;
        }
        if (req.info.role !== 'guest' || req.info.isLoggedIn) {
            res.fail('Forbidden', 403);
            return;
        }
        next();
    };
}
exports.isLoggedOut = isLoggedOut;
//# sourceMappingURL=index.js.map