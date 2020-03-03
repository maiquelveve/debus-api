let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressSession = require('express-session');
let multParty = require('connect-multiparty');
let objextId =  require('mongodb').ObjectId;

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multParty());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

    next();
})

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .then('config/dbConnectionMySql.js')
    .into(app);

module.exports = app;