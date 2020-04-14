import Viagem from '../models/Viagem';

class ViagensController {
    async index(req, res) {
        const viagem = await Viagem.findAll({include:['veiculo', 'local_referencia_origem', 'local_referencia_destino']});
        res.json(viagem)
    }

    async cadastrar(req, res) {
        try {
            return res.status(200).json({ok:true})

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new ViagensController();



/* eh assim que faz para executar uma query na mão
    import Sequelize from 'sequelize';
    import dataBaseConfig from '../../config/database';
    const sequelize = new Sequelize(dataBaseConfig);
    const viagem =  await sequelize.query("SELECT * FROM viagens", { type: sequelize.QueryTypes.SELECT})
*/