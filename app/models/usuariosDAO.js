function UsuariosDAO(connection) {
    this._connection = connection;
}

UsuariosDAO.prototype.cadastrar = function(usuario, callback) {
    resultado = this._connection.query('insert into usuarios set ?', usuario, callback);
}

module.exports = function() {
    return UsuariosDAO;
}
