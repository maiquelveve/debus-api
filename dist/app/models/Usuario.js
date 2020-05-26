"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class Usuario extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                st_nome: _sequelize2.default.STRING,
                st_email: _sequelize2.default.STRING,
                st_senha: _sequelize2.default.STRING
            },
            {
                sequelize,
                modelName: "Usuario",
                tableName: 'usuarios'
            }
        );

        this.addHook('beforeSave', async (usuario) => {
            if(usuario.st_senha) {
               usuario.st_senha = await _bcryptjs2.default.hash(usuario.st_senha, 8);
            }
        });
 
        return this;
    }

    compararSenhas(senha){
        return _bcryptjs2.default.compare(senha, this.st_senha);
    }
}

exports. default = Usuario; 