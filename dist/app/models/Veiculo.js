"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Veiculo extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                st_placa: _sequelize2.default.STRING,
                nr_lugares: _sequelize2.default.INTEGER,
                ch_ativo: _sequelize2.default.INTEGER
            },
            {
                sequelize,
                modelName: 'Veiculo',
                tableName: 'veiculos'
            }
        );
 
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Empresa, { foreignKey: 'id_empresa', as: 'empresa' });
    }
}

exports. default = Veiculo; 