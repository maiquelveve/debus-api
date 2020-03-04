let crypto = require('crypto');

module.exports.cadastrar = (aplicacao, req, res) => {
    let dados = req.body;        
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

module.exports.verficarEmailJaCadastrado = (aplicacao, req, res) => {
    
        let dados = req.body; 
        let connMysql = aplicacao.config.dbConnectionMySql();    
        let usuariosDAO = new aplicacao.app.models.usuariosDAO(connMysql);
        
        usuariosDAO.verficarEmailJaCadastrado(dados.st_email, (err, result) => {
            if(err) {
                let retorno = [{
                    success: 0,
                    status: 'error',
                    error: 'dataBaseError',
                    erroCode: err.code
                }];

                res.json(retorno)
                return;
    
            } else {
                if(result.length > 0) {
                    let retorno = [
                        {success: 0, status: 'error', error: 'formError', erroCode: 'form_inputs_email_exists' },
                        {value: '', msg: 'Email já cadastrado no sistema.', param: 'st_email', location: 'body'}
                    ];

                    res.json(retorno)
                    return;
                    
                } else {
                    let retorno = [{
                        success: 1,
                        status: 'ok',
                        insertId: result.insertId
                    }];
        
                    res.json(retorno);
                }

            }
        })
}