import Usuario from '../models/Usuario';

class UsuariosController {

    async cadastrar(req, res) {
        const usuario = await Usuario.create(req.body);
        return res.json(usuario)
        //return res.json({msg: 'OKKK'})
    }
}

export default new UsuariosController(); 