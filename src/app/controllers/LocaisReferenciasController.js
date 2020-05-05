import LocalReferencia from '../models/LocalReferencia';

class LocaisReferenciasController {

    async cadastrar(req, res) {
        try {
            await LocalReferencia.create(req.body)
            const retorno = [{success: 1, msg: 'ok'}]
            return res.status(200).json(retorno)

        } catch (error) {
            console.log(error)
            const retorno = [{success: 0, msg: 'Ocorreu um eroo. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }

    async buscarLocaisReferenciasPorCidades(req, res) {
        try {
            const {id_cidade} = req.query
            const {id_usuario} = req.body
            const locaisReferencias = await LocalReferencia.findAll({where:{id_cidade, id_usuario}})

            return res.status(200).json(locaisReferencias)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um eroo. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new LocaisReferenciasController();