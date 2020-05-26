"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ViagemPassageiro extends _sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                
            }, 
            {
                sequelize,
                modelName: 'ViagemPassageiro',
                tableName: 'viagens_passageiros'
                
            }
        )

        return this
    }

    static associate(model) {
        this.belongsTo(model.Viagem, { foreignKey: 'id_viagem', as: 'viagem'})
        this.belongsTo(model.Passageiro, { foreignKey: 'id_passageiro', as: 'passageiro'})
    }
}

exports. default = ViagemPassageiro;