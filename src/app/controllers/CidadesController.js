import Cidade from '../models/Cidade';

class CidadesController {
    
    async buscarTodasCidadesPorEstado(req, res) {
        try {
            const {id_estado} = req.query
            const cidades = await Cidade.findAll({where:{id_estado}})
            return res.status(200).json(cidades)
            
        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new CidadesController();