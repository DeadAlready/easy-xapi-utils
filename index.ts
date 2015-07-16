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