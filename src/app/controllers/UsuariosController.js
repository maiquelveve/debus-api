import Usuario from '../models/Usuario';

class UsuariosController {

    async cadastrar(req, res) {
        const usuario = await Usuario.create(req.body);
        const retorno = [{success: 1, msg: 'ok', user: usuario}]
        //const retorno = [{success: 0, msg: 'erro'}, {msg:'nome obrigatorio'}]
        
        return res.json(retorno)
    }
}

export default new UsuariosController(); 