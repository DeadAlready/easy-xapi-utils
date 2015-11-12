/**
 * Created by karl on 16/07/15.
 */
/// <reference path='typings/tsd.d.ts' />
'use strict';
function compareRole(role, compare, reverse) {
    if (Array.isArray(compare)) {
        return reverse ? compare.indexOf(role) === -1 : compare.indexOf(role) !== -1;
    }
    return reverse ? compare !== role : compare === role;
}
function isLoggedIn(role, reverse) {
    if (role && typeof role !== 'string' && !Array.isArray(role)) {
        throw new TypeError('Role has to be string or string[]');
    }
    return function checkLoggedIn(req, res, next) {
        if (!req.info || !req.info.isLoggedIn) {
            res.fail('Unauthorized', 401);
            return;
        }
        if (role && !compareRole(req.info.role, role, reverse)) {
            res.fail('Forbidden', 403);
            return;
        }
        next();
    };
}
exports.isLoggedIn = isLoggedIn;
function hasRole(role, reverse) {
    if (typeof role !== 'string' && !Array.isArray(role)) {
        throw new TypeError('Role has to be string or string[]');
    }
    return function checkRole(req, res, next) {
        if (!req.info) {
            res.fail('Unauthorized', 401);
            return;
        }
        if (!compareRole(req.info.role, role, reverse)) {
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
var RBAC = require('./lib/rbac');
exports.setRbac = RBAC.setRbac;
exports.rbac = RBAC.rbac;
//# sourceMappingURL=index.js.map