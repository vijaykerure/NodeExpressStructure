'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const config = require('../config').get(process.env.NODE_ENV);
const User = require('../models/user');

// USE JWS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        let user = await User.findById(payload.sub);
        if(!user){
            return done(null, false);
        }
        return done(null, true, user);
    } catch (error) {
        return done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    try {
        let user = await User.findOne({ email });
        if(!user){
            return done(null, false);
        }
        let isValid = await user.verifyPassword(password);
        
        if(!isValid){
            return done(null,false);
        }
        return done(null, user);    
    } catch (error) {
        done(error, false);    
    }
}));