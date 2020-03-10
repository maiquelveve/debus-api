import Usuario from '../models/Usuario';

class UsuariosController {

    async cadastrar(req, res) {
        try {
            //fazer aqui as validações com yup

            const emailExists = await Usuario.findOne({ where: {st_email: req.body.st_email} })
            if(emailExists) {
                const retorno = [{success: 0, msg:'Email já cadastrado'}]
                return res.status(400).json(retorno)
            } 
        
            const usuario = await Usuario.create(req.body);
            const retorno = [{success: 1, msg: 'ok', user: usuario}]                
            return res.status(200).json(retorno)    

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]                
            return res.status(400).json(retorno)    
        }
    }
}

export default new UsuariosController();  