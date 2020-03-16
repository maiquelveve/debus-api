import Viagem from '../models/Viagem';

class ViagensController {
    async index(req, res) {
        const viagem =  await Viagem.findAll()
        res.json(viagem)
    }
}

export default new ViagensController();