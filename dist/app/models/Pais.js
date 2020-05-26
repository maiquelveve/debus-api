"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Pais extends _sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                ch_sigla: _sequelize2.default.STRING,
                st_nome: _sequelize2.default.STRING
            },
            {
                sequelize,
                modelName: 'Pais',
                tableName: 'pais'
            }
        )

        return this
    }

    
}

exports. default = Pais;