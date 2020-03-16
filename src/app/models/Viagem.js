import Sequelize, { Model } from 'sequelize';

class Viagen extends Model {
    static init(sequelize) {
        super.init(
            {
                vagas: Sequelize.INTEGER,
                hh_horario: Sequelize.TIME,
                nr_id_local_referencia_origem: Sequelize.INTEGER,
                nr_id_local_referencia_destino: Sequelize.INTEGER,
                id_veiculo: Sequelize.INTEGER,
                en_situacao: Sequelize.STRING,
            },
            {
                sequelize
            }
        );
 
        return this;
    }
}

export default Viagen; 