"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Viagem extends _sequelize.Model {
    
    static init(sequelize) {
        super.init(
            {
                vagas: _sequelize2.default.INTEGER,
                hh_horario: _sequelize2.default.TIME,
                dt_data: _sequelize2.default.STRING,
                nr_id_local_referencia_origem: _sequelize2.default.INTEGER,
                nr_id_local_referencia_destino: _sequelize2.default.INTEGER,
                en_situacao: _sequelize2.default.STRING,
                vl_valor: _sequelize2.default.FLOAT,
            },
            {
                sequelize,
                modelName: 'Viagem',
                tableName: 'viagens'
            }
        );
 
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Veiculo, { foreignKey: 'id_veiculo', as: 'veiculo' });
        this.belongsTo(models.LocalReferencia, { foreignKey: 'nr_id_local_referencia_origem', as: 'local_referencia_origem' });
        this.belongsTo(models.LocalReferencia, { foreignKey: 'nr_id_local_referencia_destino', as: 'local_referencia_destino' });
    }
}

exports. default = Viagem; 