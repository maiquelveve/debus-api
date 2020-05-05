import { Router } from 'express';
import authMiddleware from './app/middlewares/authValidate';

import ConfigController from './app/controllers/ConfigController';
import UsuariosController from './app/controllers/UsuariosController';
import VeiculosController from './app/controllers/VeiculosController';
import ViagensController from './app/controllers/ViagensController'; 
import EmpresasController from './app/controllers/EmpresasController';
import PaisesController from './app/controllers/PaisesController';
import EstadosController from './app/controllers/EstadosController';
import CidadesController from './app/controllers/CidadesController';
import LocaisReferenciasController from './app/controllers/LocaisReferenciasController';

const routes = new Router()

routes.post('/config/validaToken', ConfigController.validaToken)
routes.post('/usuarios/cadastrar', UsuariosController.cadastrar)
routes.post('/usuarios/login', UsuariosController.login)
routes.get('/paises', PaisesController.buscarTodosPaises)
routes.get('/estados', EstadosController.buscarTodosEstadosPorPais)
routes.get('/cidades', CidadesController.buscarTodasCidadesPorEstado)

//Daqui para baixo somente as rotas de usuarios logados
routes.use(authMiddleware)

//Rotas LocaisReferencia - Esta aqui pq precisa do id_usuario
routes.post('/locaisReferencias', LocaisReferenciasController.cadastrar)
routes.get('/locaisReferencias', LocaisReferenciasController.buscarLocaisReferenciasPorCidades)
routes.get('/locaisReferencias/:id', LocaisReferenciasController.buscarLocaisReferencias)
routes.put('/locaisReferencias/:id', LocaisReferenciasController.editar)

//Rotas Veiculos
routes.post('/veiculos', VeiculosController.cadastrar);
routes.get('/veiculos', VeiculosController.listar);
routes.get('/veiculos/buscarVeiculosPorEmpresa', VeiculosController.buscarVeiculosPorEmpresa)
routes.get('/veiculos/:id', VeiculosController.buscarVeiculo);
routes.put('/veiculos/:id', VeiculosController.editar);
routes.put('/veiculos/ativar/:id', VeiculosController.ativar);
routes.put('/veiculos/desativar/:id', VeiculosController.desativar);

//Rotas Empresas
routes.post('/empresas', EmpresasController.cadastrar);
routes.get('/empresas', EmpresasController.listar);
routes.get('/empresas/buscarDoUsuario', EmpresasController.buscarEmpresasUsuario)
routes.get('/empresas/:id', EmpresasController.buscarEmpresa);
routes.put('/empresas/:id', EmpresasController.editar);
routes.put('/empresas/ativar/:id', EmpresasController.ativar);
routes.put('/empresas/desativar/:id', EmpresasController.desativar);

//Rotas Viagens
routes.post('/viagens', ViagensController.cadastrar);
routes.get('/viagens', ViagensController.listar);
routes.get('/viagens/:id', ViagensController.buscarViagem);
routes.put('/viagens/:id', ViagensController.editar);
routes.put('/viagens/confirmar/:id', ViagensController.confirmar);
routes.put('/viagens/cancelar/:id', ViagensController.cancelar);
routes.put('/viagens/reativar/:id', ViagensController.reativar);

export default routes