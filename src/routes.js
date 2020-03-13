import { Router } from 'express';

import UsuariosController from './app/controllers/UsuariosController';
import ConfigController from './app/controllers/ConfigController';

const routes = new Router()

routes.post('/config/validaToken', ConfigController.validaToken)

routes.post('/usuarios/cadastrar', UsuariosController.cadastrar)
routes.post('/usuarios/login', UsuariosController.login)

export default routes