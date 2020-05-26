"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Cidade extends _sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                st_nome: _sequelize2.default.STRING,
                ibge: _sequelize2.default.INTEGER
            },
            {
                sequelize,
                modelName: 'Cidade',
                tableName: 'cidades'
            }
        )

        return this
    }

    static associate(model) {
        this.belongsTo(model.Estado, { foreignKey: 'id_estado', as: 'estado' })
    }
}

exports. default = Cidade;