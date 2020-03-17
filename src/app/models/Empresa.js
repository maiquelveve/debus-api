import Sequelize, {Model} from 'sequelize';

class Empresa extends Model {
    static init(sequelize) {
        super.init(
            {
                st_recefi: Sequelize.STRING,
                st_cel: Sequelize.STRING
            },
            {
                sequelize, 
                modelName: "Empresa",
                tableName: 'empresas'
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
    }
}

export default Empresa;