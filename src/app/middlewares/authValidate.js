import jwt from 'jsonwebtoken';
import { promisify } from 'util'
import configAuth from '../../config/authConfig';

export default async (req, res, next) => {

    const token = req.headers.auth

    if(!token){
        const retorno = [{success: 0, msg: 'Token invalido!'}]
        return res.status(401).json(retorno)
    }
    
    try {
        const decoded = await promisify(jwt.verify)(token, configAuth.secret)
        req.body.id_usuario = decoded.id
        next()

    } catch (error) {
        const retorno = [{success: 0, msg: 'Token invalido!'}]
        return res.status(401).json(retorno)
    }
}
