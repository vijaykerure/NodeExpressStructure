'use strict';

const config = require('./config').get(process.env.NODE_ENV);
const app = require('express')();
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Connect to database
mongoose.connect(config.DATABASE, { useNewUrlParser: true, useCreateIndex: true });

// Start logging
app.use(logger('dev'));

// Parse http cookies
app.use(cookieParser());

// Parse http x-www-form-urlencoded variables
app.use(bodyParser.urlencoded({extended: true}));

// Import Routes
require('./routes')(app);

// Catch 404 errors and forward them to the error handler function
app.use((req, res, next) => {
    let error = new Error('Page not found');
    error.status = 400;
    next(error);
});

// Error Handler Function
app.use((err, req, res, next) => {
    
    const error = app.get('env') === 'development' ? err : {};
    const status = error.status || 500;

    // Respond to client
    return res.status(status).json({ error });
});



// Create and Start server
const port = config.PORT || 8080;
app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`);
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${used} MB`);
});