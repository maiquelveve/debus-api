import Sequelize, { Model } from 'sequelize';

class Cidade extends Model {

    static init(sequelize) {
        super.init(
            {
                st_nome: Sequelize.STRING,
                ibege: Sequelize.INTEGER
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

export default Cidade;