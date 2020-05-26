"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

var _Usuario = require('../app/models/Usuario'); var _Usuario2 = _interopRequireDefault(_Usuario);
var _Veiculo = require('../app/models/Veiculo'); var _Veiculo2 = _interopRequireDefault(_Veiculo);
var _Viagem = require('../app/models/Viagem'); var _Viagem2 = _interopRequireDefault(_Viagem);
var _Empresa = require('../app/models/Empresa'); var _Empresa2 = _interopRequireDefault(_Empresa);
var _Pais = require('../app/models/Pais'); var _Pais2 = _interopRequireDefault(_Pais);
var _Estado = require('../app/models/Estado'); var _Estado2 = _interopRequireDefault(_Estado);
var _Cidade = require('../app/models/Cidade'); var _Cidade2 = _interopRequireDefault(_Cidade);
var _LocalReferencia = require('../app/models/LocalReferencia'); var _LocalReferencia2 = _interopRequireDefault(_LocalReferencia);
var _Passageiro = require('../app/models/Passageiro'); var _Passageiro2 = _interopRequireDefault(_Passageiro);
var _ViagemPassageiro = require('../app/models/ViagemPassageiro'); var _ViagemPassageiro2 = _interopRequireDefault(_ViagemPassageiro);

const models = [_Usuario2.default, _Veiculo2.default, _Viagem2.default, _Empresa2.default, _Pais2.default, _Estado2.default, _Cidade2.default, _LocalReferencia2.default, _Passageiro2.default, _ViagemPassageiro2.default];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new (0, _sequelize2.default)(_database2.default);
        models.map(model => model.init(this.connection))
              .map( model => model.associate && model.associate(this.connection.models))
    }
}

exports. default = new Database();