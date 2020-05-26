"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Usuario = require('../models/Usuario'); var _Usuario2 = _interopRequireDefault(_Usuario);
var _yup = require('yup'); var yup = _interopRequireWildcard(_yup);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _authConfig = require('../../config/authConfig'); var _authConfig2 = _interopRequireDefault(_authConfig);
var _validacaoDefinicao = require('../../config/validacaoDefinicao'); var _validacaoDefinicao2 = _interopRequireDefault(_validacaoDefinicao);

class UsuariosController {

    async cadastrar(req, res) {
        try {
            //Validaçõe do req.body Inicio
            yup.setLocale(_validacaoDefinicao2.default)
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

            const emailExists = await _Usuario2.default.findOne({ where: {st_email: req.body.st_email} })
            if(emailExists) {
                const retorno = [{success: 0, msg:'Email já cadastrado'}]
                return res.status(400).json(retorno)
            } 
        
            const usuario = await _Usuario2.default.create(req.body);
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
            yup.setLocale(_validacaoDefinicao2.default)
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
            const usuario = await _Usuario2.default.findOne({ where: {st_email} })

            if(!usuario) {
                return res.status(401).json(retornoError)
            } 

            if(!(await usuario.compararSenhas(st_senha))) {
                return res.status(401).json(retornoError)
            }

            const { id } = usuario;

            return res.status(201).json({
                success: 1,
                usuario: {
                    id,
                    st_email
                },
                token: _jsonwebtoken2.default.sign({ id }, _authConfig2.default.secret, {
                    expiresIn: _authConfig2.default.expiresIn 
                })
            });
            
        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Verifique os dados informados!'}]                
            return res.status(400).json(retorno)
        }
    }
}

exports. default = new UsuariosController();  