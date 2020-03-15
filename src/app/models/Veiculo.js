import Sequelize, { Model } from 'sequelize';

class Veiculo extends Model {
    static init(sequelize) {
        super.init(
            {
                st_placa: Sequelize.STRING,
                nr_lugares: Sequelize.INTEGER,
                id_empresa: Sequelize.STRING
            },
            {
                sequelize
            }
        );
 
        return this;
    }
}

export default Veiculo; 