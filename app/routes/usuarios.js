const  { check, validationResult } = require('express-validator');

module.exports = (aplicacao) => {
    aplicacao.post
    (
        '/usuarios/cadastrar', 
        [
            check('st_email').isEmail().withMessage('Email não é valido.'),
            check('st_email').isLength({ min: 1 }).withMessage('Email é obrigatorio.'),
            check('st_senha').isLength({ min: 1 }).withMessage('Senha é obrigatorio.'),
            check('st_nome').isLength({ min: 1 }).withMessage('Nome é obrigatorio.')
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
    )
}