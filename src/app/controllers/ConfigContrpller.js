class ConfigController {
    async validaToken(req, res) {
        console.log(req.headers);
        let retorno = '';
        if(req.headers.auth) {
            retorno: true
        } else {
            retorno: false
        }
        
        
        return res.status(200).json({retorno})
    }
}

export default new ConfigController();