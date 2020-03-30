import { Router } from 'express';
import authMiddleware from './app/middlewares/authValidate';


import ConfigController from './app/controllers/ConfigController';
import UsuariosController from './app/controllers/UsuariosController';
import VeiculosController from './app/controllers/VeiculosController';
import ViagensController from './app/controllers/ViagensController'; 
import EmpresasController from './app/controllers/EmpresasController';

const routes = new Router()

routes.post('/config/validaToken', ConfigController.validaToken)
routes.post('/usuarios/cadastrar', UsuariosController.cadastrar)
routes.post('/usuarios/login', UsuariosController.login)

//daqui para baixo somente as rotas de usuarios logados
routes.use(authMiddleware)

routes.get('/veiculos', VeiculosController.index);
routes.post('/empresas', EmpresasController.cadastrar);
routes.get('/empresas', EmpresasController.listar);
routes.get('/empresas/:id', EmpresasController.buscarEmpresa);
routes.put('/empresas/:id', EmpresasController.editar);
routes.put('/empresas/ativar/:id', EmpresasController.ativar);
routes.put('/empresas/desativar/:id', EmpresasController.desativar);
routes.get('/viagens', ViagensController.index);

export default routes