'use strict';

const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.listen(8080, () => {
	console.log(`Server started on port: 8080`);
});

