import { Router } from 'express';

import ConfigController from './app/controllers/ConfigController';
import UsuariosController from './app/controllers/UsuariosController';
import VeiculosController from './app/controllers/VeiculosController'; 

const routes = new Router()

routes.post('/config/validaToken', ConfigController.validaToken)

routes.post('/usuarios/cadastrar', UsuariosController.cadastrar)
routes.post('/usuarios/login', UsuariosController.login)

routes.get('/veiculos', VeiculosController.index);

export default routes