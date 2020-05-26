"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Estado = require('../models/Estado'); var _Estado2 = _interopRequireDefault(_Estado);

class EstadosController {
    
    async buscarTodosEstadosPorPais(req, res) {
        try {
            const {id_pais} = req.query
            const estados = await _Estado2.default.findAll({where:{id_pais}})
            
            return res.status(200).json(estados);

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            return res.status(500).json(retorno)
        }
    }
}

exports. default = new EstadosController()