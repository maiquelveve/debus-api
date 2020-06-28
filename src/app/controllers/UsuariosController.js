import Usuario from '../models/Usuario';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/authConfig';
import validacaoDefinicao from '../../config/validacaoDefinicao';

class UsuariosController {

    async editarPerfil(req, res) {
        try {
            const {id_usuario, st_nome, st_email} = req.body

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
            })

            const erros = await schemaValidate.validate(req.body, { abortEarly: false }).then( () => false ).catch( () => true)
            if(erros === true) {
                const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]
                return res.status(400).json(retorno)
            }                            
            //Validaçõe do req.body FINAL

            //Verifica se email ja esta cadastrado
            const emailExists = await Usuario.findOne({ where: {st_email: st_email} })
            if(emailExists) {
                const usuarioAtual = await Usuario.findByPk(id_usuario)

                if(usuarioAtual.st_email !== st_email) {
                    const retorno = [{success: 0, msg:'Email já cadastrado'}]
                    return res.status(400).json(retorno)
                }
            } 

            //Ediatndo o perfil do usuario logado
            await Usuario.update({st_nome, st_email}, { where: {id: id_usuario} });
            const retorno = [{success: 1, msg: 'ok'}]                
            return res.status(200).json(retorno) 

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]                
            return res.status(500).json(retorno)  
        }
    }

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

    async login(req, res) {
        try {
            //Validaçõe do req.body Inicio
            yup.setLocale(validacaoDefinicao)
            const schemaValidate = yup.object().shape({                
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
            
            const retornoError = {success: 0, msg: 'Email ou Senha invalidos!'}
            const erros = await schemaValidate.validate(req.body, { abortEarly: false }).then( () => false ).catch( () => true);
            if(erros === true) {
                
                return res.status(401).json(retornoError)
            }
            //Validaçõe do req.body Final

            let {st_email, st_senha} = req.body;        
            const usuario = await Usuario.findOne({ where: {st_email} })

            if(!usuario) {
                return res.status(401).json(retornoError)
            } 

            if(!(await usuario.compararSenhas(st_senha))) {
                return res.status(401).json(retornoError)
            }

            const { id, st_nome } = usuario;

            return res.status(201).json({
                success: 1,
                usuario: {
                    id,
                    st_email,
                    st_nome
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn 
                })
            });
            
        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]                
            return res.status(400).json(retorno)
        }
    }

    async buscarUsuario(req, res) {
        try {
            const {id_usuario} = req.body
            const usuario = await Usuario.findByPk(id_usuario)
            return res.status(200).json(usuario)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]                
            return res.status(500).json(retorno)
        }
    }
}

export default new UsuariosController();  