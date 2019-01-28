'use strict';

const config = {
    production:{
        ENV: 'production',
        DATABASE: process.env.DATABASE,
        SESSION: {
            KEY: process.env.SESSION_KEY,
            SECRET: process.env.SESSION_SECRET
        },
        FACEBOOK:{
            CLIENT_ID: process.env.FB_CLIENT_ID,
            CLIENT_SECRET: process.env.FB_CLIENT_SECRET,
            CALLBACK_URL: process.env.FB_CALLBACK_URL,
            PROFILE_FIELDS: ["id", "displayname", "photos"]
        },
        JWT_SECRET: process.env.JWT_SECRET
    },
    development: {
        ENV: 'development',
        HOST: '//localhost',
        PORT: 8080,
        DATABASE: 'mongodb://localhost/notebooktimedev',
        SESSION: {
            KEY: '',
            SECRET: 'NodeExpressStructSecret'
        },
        FACEBOOK:{
            CLIENT_ID: "",
            CLIENT_SECRET: "",
            CALLBACK_URL: "//localhost:8080/auth/facebook/callback",
            PROFILE_FIELDS: ["id", "displayname", "photos"]
        },
        JWT_SECRET: 'NodeExpressStructSecret'
    }
}
module.exports.get = (env) => {
    return config[env] || config.development;
}