import Sequelize, { Model } from 'sequelize';

class Passageiro extends Model {
    static init(sequelize) {
        super.init(
            {
                st_nome: Sequelize.STRING,
                st_cpf: Sequelize.STRING
            },
            {
                sequelize,
                modelName: 'Passageiro',
                tableName: 'passageiros'
            }
        )

        return this
    }

    static associate(model) {
        this.belongsTo(model.Usuario, { foreignKey: 'id_usuario', as: 'usuario'})
    }
}

export default Passageiro;