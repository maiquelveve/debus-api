import LocalReferencia from '../models/LocalReferencia';

class LocaisReferenciasController {

    async buscarLocaisReferenciasPorCidades(req, res) {
        try {
            const {id_cidade} = req.query
            const locaisReferencias = await LocalReferencia.findAll({where:{id_cidade}})
            return res.status(200).json(locaisReferencias)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um eroo. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new LocaisReferenciasController();