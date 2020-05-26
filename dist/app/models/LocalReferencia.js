"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class LocalReferencia extends _sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                st_dsc: _sequelize2.default.STRING,
                ch_ativo: _sequelize2.default.STRING
            }, 
            {
                sequelize,
                modelName: 'LocalReferencia',
                tableName: 'locais_referencias'
                
            }
        )

        return this
    }

    static associate(model) {
        this.belongsTo(model.Cidade, { foreignKey: 'id_cidade', as: 'cidade'}),
        this.belongsTo(model.Usuario, { foreignKey: 'id_usuario', as: 'usuario'})
    }
}

exports. default = LocalReferencia;