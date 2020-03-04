function UsuariosDAO(connection) {
    this._connection = connection;
}

UsuariosDAO.prototype.verficarEmailJaCadastrado = function(email, callback) {
    let sql = `SELECT id FROM usuarios WHERE st_email = "${email}"`;
    this._connection.query(sql, callback);
}

UsuariosDAO.prototype.cadastrar = function(usuario, callback) {
    resultado = this._connection.query('insert into usuarios set ?', usuario, callback);
}

module.exports = function() {
    return UsuariosDAO;
}
