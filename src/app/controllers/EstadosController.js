import Estado from '../models/Estado';

class EstadosController {
    
    async buscarTodosEstadosPorPais(req, res) {
        try {
            const {id_pais} = req.query
            const estados = await Estado.findAll({where:{id_pais}})
            
            return res.status(200).json(estados);

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new EstadosController()