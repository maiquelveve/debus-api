import { Router } from 'express';

import ConfigController from './app/controllers/ConfigController';
import UsuariosController from './app/controllers/UsuariosController';
import VeiculosController from './app/controllers/VeiculosController';
import ViagensController from './app/controllers/ViagensController'; 
import EmpresasController from './app/controllers/EmpresasController';

const routes = new Router()

routes.post('/config/validaToken', ConfigController.validaToken)

routes.post('/usuarios/cadastrar', UsuariosController.cadastrar)
routes.post('/usuarios/login', UsuariosController.login)

routes.get('/veiculos', VeiculosController.index);

routes.get('/empresas', EmpresasController.cadastrar);

routes.get('/viagens', ViagensController.index);

export default routes