'use strict';
module.exports = (app) =>{
    app.use('/user', require('../routes/user'));
};