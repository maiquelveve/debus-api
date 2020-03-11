//INSTALLAR pg pg-hstore
// module.exports = {
//     dialect: 'postgres',
//     host: 'localhost',
//     username: 'postgres',
//     password: 'admin',
//     database: 'debus',
//     define: {
//         timestamps: false,
//         underscored: true,
//         underscoredAll: true,
//     }
// }

//INSTALLAR mysql2
module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'debus',
    define: {
        timestamps: false,
        underscored: true,
        underscoredAll: true,
    }
}