import Sequelize, { Model } from 'sequelize';

class LocalReferencia extends Model {

    static init(sequelize) {
        super.init(
            {
                st_dsc: Sequelize.STRING
            }, 
            {
                sequelize,
                modelName: 'LocalReferencia',
                tableName: 'locais_referencias'
                
            }
        )

        return this
    }

    static associate(model) {
        this.belongsTo(model.Cidade, { foreignKey: 'id_cidade', as: 'cidade'}),
        this.belongsTo(model.Usuario, { foreignKey: 'id_usuario', as: 'usuario'})
    }
}

export default LocalReferencia;