let crypto = require('crypto');

module.exports.cadastrar = (aplicacao, req, res) => {
    let dados = req.body;        

    req.assert('st_email', 'O campo "Email" é obrigatório.').notEmpty();
    req.assert('st_senha', 'O campo "Senha" é obrigatório.').notEmpty();
    req.assert('st_nome',  'O campo "Nome" é obrigatório.').notEmpty();
    req.assert('st_email', 'Email não é valido.').isEmail();

	var erros = req.validationErrors();
    if(erros) {
        erros.unshift({success: 0, status: 'error', error: 'formError', erroCode: 'form_inputs_invalided' }) 
		res.status(200).json(erros)
		return; 
	} 

    dados.st_senha = crypto.createHash("md5").update(dados.st_senha).digest("hex");

    let connMysql = aplicacao.config.dbConnectionMySql();    
    let usuariosDAO = new aplicacao.app.models.usuariosDAO(connMysql);
    
    usuariosDAO.cadastrar(dados, (err, result) => {
        if(err) {
            let retorno = [{
                success: 0,
                status: 'error',
                error: 'dataBaseError',
                erroCode: err.code
            }];

            res.json(retorno);    

        } else {
            let retorno = [{
                success: 1,
                status: 'ok',
                insertId: result.insertId
            }];

            res.json(retorno);
        }
    })
}