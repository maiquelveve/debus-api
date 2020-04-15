import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/authConfig';

class ConfigController {
    async validaToken(req, res) {

        const token = req.headers.auth

        if(!token) {
            const retorno = {success: false, msg: 'TOKEN_INVALIDO'}
            return res.status(401).json(retorno)
        }

        //validação do token
        try {
            const decoded = await promisify(jwt.verify)(token, authConfig.secret);
            req.userId = decoded.id

            const retorno = {success: true, msg: 'TOKEN_VALIDO'}
            return res.status(200).json(retorno)

        } catch (error) {
            const retorno = {success: false, msg: 'TOKEN_INVALIDO'}
            return res.status(401).json(retorno)
        }        
    }
}

export default new ConfigController();