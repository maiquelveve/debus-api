"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Pais = require('../models/Pais'); var _Pais2 = _interopRequireDefault(_Pais);

class PaisesController {

    async buscarTodosPaises(req, res) {
        try {
            const paises = await _Pais2.default.findAll()
            return res.status(200).json(paises)

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu um erro. Tente novamente mais tarde!'}]
            return res.status(500).json(retorno)
        }
    }
}

exports. default = new PaisesController();