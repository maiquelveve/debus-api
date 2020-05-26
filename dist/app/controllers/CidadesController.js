"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Cidade = require('../models/Cidade'); var _Cidade2 = _interopRequireDefault(_Cidade);

class CidadesController {
    
    async buscarTodasCidadesPorEstado(req, res) {
        try {
            const {id_estado} = req.query
            const cidades = await _Cidade2.default.findAll({where:{id_estado}})
            return res.status(200).json(cidades)
            
        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde.'}]
            return res.status(500).json(retorno)
        }
    }
}

exports. default = new CidadesController();