import Sequelize, { Model } from 'sequelize';

class Viagem extends Model {
    
    static init(sequelize) {
        super.init(
            {
                vagas: Sequelize.INTEGER,
                hh_horario: Sequelize.TIME,
                dt_data: Sequelize.STRING,
                nr_id_local_referencia_origem: Sequelize.INTEGER,
                nr_id_local_referencia_destino: Sequelize.INTEGER,
                en_situacao: Sequelize.STRING,
                vl_valor: Sequelize.FLOAT,
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

export default Viagem; 