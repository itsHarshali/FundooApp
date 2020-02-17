const express = require('express');
let routes = require('./routers/routers');
const bodyParser = require('body-parser');
const expressValidator=require('express-validator');
var cors = require('cors')
const mongoose =require('./config/databaseService')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// create express app
const app = express();
app.use(cors());
app.use('/fundoo', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/', routes);

// listen for requests 
app.listen(4000, () => {
    mongoose.connect();
    console.log("Server is listening on port 4000");
});
module.exports=app