import Sequelize, { Model } from 'sequelize';

class Estado extends Model {

    static init(sequelize) {
        super.init(
            {
                ch_sigla: Sequelize.STRING,
                st_nome: Sequelize.STRING
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

export default Estado;