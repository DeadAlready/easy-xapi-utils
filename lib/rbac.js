/**
 * Created by karl on 12/11/15.
 */
'use strict';
var map = {};
var RBAC = require('easy-rbac');
var RBACWrap = (function () {
    function RBACWrap(rbac) {
        this.rbac = rbac;
    }
    RBACWrap.prototype.can = function (operation, params, errorCallback) {
        if (typeof operation !== 'string') {
            throw new TypeError('Expected first parameter to be string');
        }
        var $this = this;
        return function canAccess(req, res, next) {
            var resultFn = function (err, can) {
                if (err || !can) {
                    errFn();
                    return;
                }
                next();
            };
            var errFn = function (err) {
                if (errorCallback) {
                    errorCallback(req, res, next);
                    return;
                }
                res.fail('Forbidden', 403);
            };
            if (typeof params === 'function') {
                params(req, res, function (err, data) {
                    if (err) {
                        errFn(new Error('RBAC check failed'));
                        return;
                    }
                    $this.rbac.can((req.info.role || 'guest'), operation, data, resultFn);
                });
                return;
            }
            $this.rbac.can((req.info.role || 'guest'), operation, params, resultFn);
        };
    };
    return RBACWrap;
})();
function setRbac(name, opts) {
    var rbac = new RBAC(opts);
    map[name] = new RBACWrap(rbac);
    return map[name];
}
exports.setRbac = setRbac;
function rbac(name) {
    return map[name];
}
exports.rbac = rbac;
//# sourceMappingURL=rbac.js.map