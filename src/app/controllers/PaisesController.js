import Pais from '../models/Pais';

class PaisesController {

    async buscarTodosPaises(req, res) {
        try {
            const paises = await Pais.findAll()
            return res.status(200).json(paises)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            return res.status(500).json(retorno)
        }
    }
}

export default new PaisesController();