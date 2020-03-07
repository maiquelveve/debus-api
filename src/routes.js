import { Router } from 'express';

import UsuariosController from './app/controllers/UsuariosController';

const routes = new Router()

routes.post('/usuarios/cadastrar', UsuariosController.cadastrar)

export default routes