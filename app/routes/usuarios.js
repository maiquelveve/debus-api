const  { check, validationResult } = require('express-validator');

module.exports = (aplicacao) => {
    aplicacao.post
    (
        '/usuarios/cadastrar', 
        [
            check('st_email').notEmpty().withMessage('Email é obrigatorio.'),
            check('st_email').isEmail().withMessage('Email não é valido.'),
            check('st_senha').notEmpty().withMessage('Senha é obrigatorio.'),
            check('st_nome').notEmpty().withMessage('Nome é obrigatorio.'),
            check('st_nome').isLength({ max:20 }).withMessage('Nome maior que 20 caracteres.'),
            check('st_senha').isLength({ max:35 }).withMessage('Senha maior que 35 caracteres.'),
            check('st_email').isLength({ max:25 }).withMessage('Email maior que 25 caracteres.'),
        ],   
        (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let errosResult = errors.array()
                errosResult.unshift({success: 0, status: 'error', error: 'formError', erroCode: 'form_inputs_invalided' }) 
                return res.status(200).json(errosResult);
            }

            try {
                aplicacao.app.controllers.usuariosController.cadastrar(aplicacao, req, res);
                
            } catch (error) {
                res.json(error);
            }
        }
    );

    aplicacao.post
    ( 
        '/usuarios/verficarEmailJaCadastrado', 
        [
            check('st_email').isEmail(),
            check('st_email').notEmpty()
        ],   
        (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let errosResult = []
                errosResult.unshift({success: 0, status: 'error', error: 'formError', erroCode: 'form_inputs_check_email_invalided' }) 
                return res.status(200).json(errosResult);
            }

            try {
                aplicacao.app.controllers.usuariosController.verficarEmailJaCadastrado(aplicacao, req, res);
                
            } catch (error) {
                res.json(error);
            }
        }
    )
}