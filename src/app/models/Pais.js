import Sequelize, { Model } from 'sequelize'

class Pais extends Model {

    static init(sequelize) {
        super.init(
            {
                ch_sigla: Sequelize.STRING,
                st_nome: Sequelize.STRING
            },
            {
                sequelize,
                modelName: 'Pais',
                tableName: 'pais'
            }
        )

        return this
    }

    
}

export default Pais;