import Sequelize, { Model } from 'sequelize';

class ViagemPassageiro extends Model {

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

export default ViagemPassageiro;