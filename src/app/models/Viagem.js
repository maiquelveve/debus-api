import Sequelize, { Model } from 'sequelize';

class Viagem extends Model {
    static init(sequelize) {
        super.init(
            {
                vagas: Sequelize.INTEGER,
                hh_horario: Sequelize.TIME,
                nr_id_local_referencia_origem: Sequelize.INTEGER,
                nr_id_local_referencia_destino: Sequelize.INTEGER,
                en_situacao: Sequelize.STRING,
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
    }
}

export default Viagem; 