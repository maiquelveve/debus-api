import Veiculo from '../models/Veiculo';

class VeiculosController {
    async index(req, res) {
        const veiculos =  await Veiculo.findOne({ where: {st_placa: 'iqy3336'} })
        res.json(veiculos)
    }
}

export default new VeiculosController();