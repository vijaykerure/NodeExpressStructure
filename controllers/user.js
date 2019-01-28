'use strict';
const User = require('../models/user');
const Auth = require('../lib/auth');

module.exports = {
    signIn: async(req, res, next) => {
        console.log("--", req.user);
        let token = await Auth.signToken(req.user);
        return res.status(200).json({token: token, success: true});
    },
    signUp: async(req, res, next) => {
        let newUser = new User(req.value.body);
        newUser = await newUser.save();
        if(!newUser){
            return next({status: 404, message: "User not found."});
        }
        let token = Auth.signToken(newUser);
        return res.status(201).json({token: token, success: true});
    },
    secret: async(req, res, next) => {
        return res.json({ secret: 'resource' });
    }
}