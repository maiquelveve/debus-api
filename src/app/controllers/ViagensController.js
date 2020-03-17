import Viagem from '../models/Viagem';

class ViagensController {
    async index(req, res) {
        const viagem = await Viagem.findAll({include:['veiculo']});
        res.json(viagem)
    }
}

export default new ViagensController();



/* eh assim que faz para executar uma query na mão
    import Sequelize from 'sequelize';
    import dataBaseConfig from '../../config/database';
    const sequelize = new Sequelize(dataBaseConfig);
    const viagem =  await sequelize.query("SELECT * FROM viagens", { type: sequelize.QueryTypes.SELECT})
*/