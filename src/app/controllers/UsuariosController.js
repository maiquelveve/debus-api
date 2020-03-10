import Usuario from '../models/Usuario';

class UsuariosController {

    async cadastrar(req, res) {
        const usuario = await Usuario.create(req.body);
        const retorno = [{success: 1, msg: 'ok', user: usuario}]
        //const retorno = [{success: 0, msg:'Email já cadastrado'}]
        
        return res.status(200).json(retorno)
    }
}

export default new UsuariosController();  