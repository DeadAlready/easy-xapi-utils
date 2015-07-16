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
//# sourceMappingURL=index.js.map