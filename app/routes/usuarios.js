module.exports = (aplicacao) => {
    aplicacao.post('/usuarios/cadastrar', (req, res) => {
        try {
            aplicacao.app.controllers.usuariosController.cadastrar(aplicacao, req, res);
            
        } catch (error) {
            res.json(error);
        }
    })
}