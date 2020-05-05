import LocalReferencia from '../models/LocalReferencia';
import { validaString, validaNumber } from '../../service/validacoesBasicas';

class LocaisReferenciasController {

    async cadastrar(req, res) {
        try {
            const erros = await validacao(req.body, res);

            if(erros === 0) {
                await LocalReferencia.create(req.body)
                const retorno = [{success: 1, msg: 'ok'}]
                return res.status(200).json(retorno)
            }

        } catch (error) {
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

function validacao(dados, res) {

    let retorno = [{success: 0, msg: 'formError'}]

    if(!validaString(dados.st_dsc, 2, 128)) {
        retorno = [...retorno, {success: 0, msg: 'Ocorreu um erro. Verifique os dados informados.'}]
        res.status(400).json(retorno)
        return 1 
    }

    if(!validaNumber(dados.id_cidade, 1)) {
        retorno = [...retorno, {success: 0, msg: 'Ocorreu um erro. Verifique os dados informados.'}]
        res.status(400).json(retorno)      
        return 1
    }

    return 0
}

export default new LocaisReferenciasController();