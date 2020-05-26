"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Estado extends _sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                ch_sigla: _sequelize2.default.STRING,
                st_nome: _sequelize2.default.STRING
            },
            {
                sequelize,
                modelName: 'Estado',
                tableName: 'estados'
            }
        )

        return this
    }

    static associate(model) {
        this.belongsTo(model.Pais, { foreignKey: 'id_pais', as: 'pais' })
    }
}

exports. default = Estado;