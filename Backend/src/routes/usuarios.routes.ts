/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { listarUsuarios, crearUsuarios, logearUsuarioPorEmailYPassword, obtenerUsuarioPorUsername, verificarUsuario, olvidarContrasenia } from '../controllers/usuarios.controller'
const routes = Router()

routes.get('/listarUsuarios', listarUsuarios)
routes.post('/crearUsuario', crearUsuarios)
routes.get('/obtenerUsuario', obtenerUsuarioPorUsername)
routes.post('/logearUsuario', logearUsuarioPorEmailYPassword)
routes.post('/verificarUsuario', verificarUsuario)
routes.get('/olvidarContrasenia', olvidarContrasenia)

export default routes
