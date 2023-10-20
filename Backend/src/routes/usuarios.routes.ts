import { Router } from 'express'
import { listarUsuarios, crearUsuarios, obtenerUsuarioPorUsernameYPassword, obtenerUsuarioPorUsername } from '../controllers/usuarios.controller'
import { query, body } from 'express-validator'
const routes = Router()

routes.get('/listarUsuarios', listarUsuarios)
routes.post('/crearUsuario', crearUsuarios)
routes.get('/obtenerUsuario',
  [
    query('q').notEmpty().isString().trim().escape().isLength({ max: 10 }).isLength({ min: 3 }).withMessage('El username debe tener al menos 3 caracteres y maximo 10')
  ], obtenerUsuarioPorUsername)
routes.post('/logear', [body('username').notEmpty().isString().trim().escape().isLength({ max: 10 }).isLength({ min: 3 }).withMessage('El username debe tener al menos 3 caracteres y maximo 10'), body('password').notEmpty().isString().trim().escape().isLength({ max: 10 }).isLength({ min: 3 }).withMessage('El password debe tener al menos 3 caracteres y maximo 10')], obtenerUsuarioPorUsernameYPassword)

export default routes
