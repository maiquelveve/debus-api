"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Empresa extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                st_nome: _sequelize2.default.STRING,
                st_recefi: _sequelize2.default.STRING,
                st_cel: _sequelize2.default.STRING,
                ch_ativo: _sequelize2.default.STRING,
            },
            {
                sequelize, 
                modelName: "Empresa",
                tableName: 'empresas'
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
    }
}

exports. default = Empresa;