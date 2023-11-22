/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { listarUsuarios, crearUsuarios, logearUsuarioPorEmailYPassword, verificarUsuario, olvidarContrasenia, restablecerContrasenia, obtenerUsuario } from '../controllers/usuarios.controller'
const routes = Router()

routes.get('/listarUsuarios', listarUsuarios)
routes.post('/crearUsuario', crearUsuarios)
routes.post('/logearUsuario', logearUsuarioPorEmailYPassword)
routes.post('/verificarUsuario', verificarUsuario)
routes.get('/olvidarContrasenia', olvidarContrasenia)
routes.get('/obtenerUsuario', obtenerUsuario)
routes.post('/restablecerContrasenia', restablecerContrasenia)

export default routes
