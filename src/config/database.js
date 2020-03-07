module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    database: 'debus',
    define: {
        timestamps: false,
        underscored: true,
        underscoredAll: true,
    }
}