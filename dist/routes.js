"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _authValidate = require('./app/middlewares/authValidate'); var _authValidate2 = _interopRequireDefault(_authValidate);

var _ConfigController = require('./app/controllers/ConfigController'); var _ConfigController2 = _interopRequireDefault(_ConfigController);
var _UsuariosController = require('./app/controllers/UsuariosController'); var _UsuariosController2 = _interopRequireDefault(_UsuariosController);
var _VeiculosController = require('./app/controllers/VeiculosController'); var _VeiculosController2 = _interopRequireDefault(_VeiculosController);
var _ViagensController = require('./app/controllers/ViagensController'); var _ViagensController2 = _interopRequireDefault(_ViagensController); 
var _EmpresasController = require('./app/controllers/EmpresasController'); var _EmpresasController2 = _interopRequireDefault(_EmpresasController);
var _PaisesController = require('./app/controllers/PaisesController'); var _PaisesController2 = _interopRequireDefault(_PaisesController);
var _EstadosController = require('./app/controllers/EstadosController'); var _EstadosController2 = _interopRequireDefault(_EstadosController);
var _CidadesController = require('./app/controllers/CidadesController'); var _CidadesController2 = _interopRequireDefault(_CidadesController);
var _LocaisReferenciasController = require('./app/controllers/LocaisReferenciasController'); var _LocaisReferenciasController2 = _interopRequireDefault(_LocaisReferenciasController);

//Controller de exemplo de materialUI
var _ExemploMaterialUiController = require('./app/controllers/ExemploMaterialUiController'); var _ExemploMaterialUiController2 = _interopRequireDefault(_ExemploMaterialUiController);

const routes = new (0, _express.Router)()

//Rota para exemplo de materialUI
routes.post('/exemploMaterialUi', _ExemploMaterialUiController2.default.exemploMaterialUi)

routes.post('/config/validaToken', _ConfigController2.default.validaToken)
routes.post('/usuarios/cadastrar', _UsuariosController2.default.cadastrar)
routes.post('/usuarios/login', _UsuariosController2.default.login)
routes.get('/paises', _PaisesController2.default.buscarTodosPaises)
routes.get('/estados', _EstadosController2.default.buscarTodosEstadosPorPais)
routes.get('/cidades', _CidadesController2.default.buscarTodasCidadesPorEstado)
routes.get('/viagens/buscarViagensHome', _ViagensController2.default.buscarViagensHome);

//Daqui para baixo somente as rotas de usuarios logados
routes.use(_authValidate2.default)

//Rotas LocaisReferencia - Esta aqui pq precisa do id_usuario
routes.post('/locaisReferencias', _LocaisReferenciasController2.default.cadastrar)
routes.get('/locaisReferencias', _LocaisReferenciasController2.default.buscarLocaisReferenciasPorCidades)
routes.get('/locaisReferencias/listar', _LocaisReferenciasController2.default.listar)
routes.get('/locaisReferencias/:id', _LocaisReferenciasController2.default.buscarLocaisReferencias)
routes.put('/locaisReferencias/:id', _LocaisReferenciasController2.default.editar)
routes.put('/locaisReferencias/cancelar/:id', _LocaisReferenciasController2.default.cancelar)

//Rotas Veiculos
routes.post('/veiculos', _VeiculosController2.default.cadastrar);
routes.get('/veiculos', _VeiculosController2.default.listar);
routes.get('/veiculos/buscarVeiculosPorEmpresa', _VeiculosController2.default.buscarVeiculosPorEmpresa)
routes.get('/veiculos/:id', _VeiculosController2.default.buscarVeiculo);
routes.put('/veiculos/:id', _VeiculosController2.default.editar);
routes.put('/veiculos/ativar/:id', _VeiculosController2.default.ativar);
routes.put('/veiculos/desativar/:id', _VeiculosController2.default.desativar);

//Rotas Empresas
routes.post('/empresas', _EmpresasController2.default.cadastrar);
routes.get('/empresas', _EmpresasController2.default.listar);
routes.get('/empresas/buscarDoUsuario', _EmpresasController2.default.buscarEmpresasUsuario)
routes.get('/empresas/:id', _EmpresasController2.default.buscarEmpresa);
routes.put('/empresas/:id', _EmpresasController2.default.editar);
routes.put('/empresas/ativar/:id', _EmpresasController2.default.ativar);
routes.put('/empresas/desativar/:id', _EmpresasController2.default.desativar);

//Rotas Viagens
routes.post('/viagens', _ViagensController2.default.cadastrar);
routes.get('/viagens', _ViagensController2.default.listar);
routes.get('/viagens/:id', _ViagensController2.default.buscarViagem);
routes.put('/viagens/:id', _ViagensController2.default.editar);
routes.put('/viagens/confirmar/:id', _ViagensController2.default.confirmar);
routes.put('/viagens/cancelar/:id', _ViagensController2.default.cancelar);
routes.put('/viagens/reativar/:id', _ViagensController2.default.reativar);

exports. default = routes