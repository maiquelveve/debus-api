"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Passageiro extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                st_nome: _sequelize2.default.STRING,
                st_cpf: _sequelize2.default.STRING
            },
            {
                sequelize,
                modelName: 'Passageiro',
                tableName: 'passageiros'
            }
        )

        return this
    }

    static associate(model) {
        this.belongsTo(model.Usuario, { foreignKey: 'id_usuario', as: 'usuario'})
    }
}

exports. default = Passageiro;