let mysql = require('mysql');

let hostL = "localhost";
let userL = "root";
let pwdL = "";
let bancoL = "debusteste";

let dbConnection = () => {
    return mysql.createConnection({
        host: hostL,
        user: userL,
        password: pwdL,
        database: bancoL
    })
}

module.exports = () => dbConnection;