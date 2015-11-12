/**
 * Created by karl on 16/07/15.
 */

/// <reference path='typings/tsd.d.ts' />

'use strict';

import express = require('express');

function compareRole(role:string, compare:string | string[], reverse?: boolean):boolean {
    if(Array.isArray(compare)) {
        return reverse ? compare.indexOf(role) === -1 : compare.indexOf(role) !== -1;
    }
    return reverse ? compare !== role : compare === role;
}

export function isLoggedIn(role?: string | string[], reverse?: boolean): express.RequestHandler {
    if(role && typeof role !== 'string' && !Array.isArray(role)) {
        throw new TypeError('Role has to be string or string[]');
    }
    return function checkLoggedIn(req:express.Request, res:express.Response, next: Function) {
        if(!req.info || !req.info.isLoggedIn) {
            res.fail('Unauthorized', 401);
            return;
        }
        if(role && !compareRole(req.info.role, role, reverse)) {
            res.fail('Forbidden', 403);
            return;
        }
        next();
    }
}

export function hasRole(role: string | string[], reverse?: boolean): express.RequestHandler {
    if(typeof role !== 'string' && !Array.isArray(role)) {
        throw new TypeError('Role has to be string or string[]');
    }
    return function checkRole(req:express.Request, res:express.Response, next: Function) {
        if(!req.info) {
            res.fail('Unauthorized', 401);
            return;
        }
        if(!compareRole(req.info.role, role, reverse)) {
            res.fail('Forbidden', 403);
            return;
        }
        next();
    }
}

export function isLoggedOut(): express.RequestHandler {
    return function checkLoggedOut(req:express.Request, res:express.Response, next: Function) {
        if(!req.info) {
            res.fail('Unauthorized', 401);
            return;
        }
        if(req.info.role !== 'guest' || req.info.isLoggedIn) {
            res.fail('Forbidden', 403);
            return;
        }
        next();
    }
}

import RBAC = require('./lib/rbac');

export var setRbac = RBAC.setRbac;
export var rbac = RBAC.rbac;