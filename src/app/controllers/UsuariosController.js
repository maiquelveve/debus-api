import Usuario from '../models/Usuario';
import * as yup from 'yup';

import validacaoDefinicao from '../../config/validacaoDefinicao';

class UsuariosController {

    async cadastrar(req, res) {
        try {
            //Validaçõe do req.body Inicio
            yup.setLocale(validacaoDefinicao)
            const schemaValidate = yup.object().shape({
                st_nome: yup
                    .string()
                    .max(50)
                    .required(),
                    
                st_email: yup
                    .string()
                    .max(50)
                    .email()
                    .required(),
                    
                st_senha: yup    
                    .string()
                    .max(50)
                    .required()
            })

            const erros = await schemaValidate.validate(req.body, { abortEarly: false }).then( () => false ).catch( () => true)
            if(erros === true) {
                const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]
                return res.status(400).json(retorno)
            }                            
            //Validaçõe do req.body FINAL

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