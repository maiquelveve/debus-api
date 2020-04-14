import Viagem from '../models/Viagem';

class ViagensController {
    async index(req, res) {
        const viagem = await Viagem.findAll({include:['veiculo', 'local_referencia_origem', 'local_referencia_destino']});
        res.json(viagem)
    }

    async cadastrar(req, res) {
        try {
            await Viagem.create(req.body)
            
            const retorno = [{success: 1, msg: 'ok'}]
            return res.status(200).json(retorno)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new ViagensController();