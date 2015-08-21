/**
 * Created by karl on 16/07/15.
 */

/// <reference path='typings/tsd.d.ts' />

'use strict';

import express = require('express');

export function isLoggedIn(role?: string): express.RequestHandler {
    return function checkLoggedIn(req:express.Request, res:express.Response, next: Function) {
        if(!req.info || !req.info.isLoggedIn) {
            res.fail('Unauthorized', 401);
            return;
        }
        if(role && req.info.role !== role) {
            res.fail('Forbidden', 403);
            return;
        }
        next();
    }
}

export function hasRole(role?: string | string[]): express.RequestHandler {
    if(typeof role !== 'string' && !Array.isArray(role)) {
        throw new TypeError('Role has to be string or string[]');
    }
    return function checkRole(req:express.Request, res:express.Response, next: Function) {
        if(!req.info) {
            res.fail('Unauthorized', 401);
            return;
        }
        if(typeof role === 'string' && req.info.role !== role || role.indexOf(req.info.role) === -1) {
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