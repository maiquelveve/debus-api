import Sequelize, { Model } from 'sequelize';

class Veiculo extends Model {
    static init(sequelize) {
        super.init(
            {
                st_placa: Sequelize.STRING,
                nr_lugares: Sequelize.INTEGER,
                ch_ativo: Sequelize.INTEGER
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

export default Veiculo; 