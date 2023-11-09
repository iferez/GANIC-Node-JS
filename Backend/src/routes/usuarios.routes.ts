/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-funciton-async */
import { Router } from 'express'
import { listarUsuarios, crearUsuarios, logearUsuarioPorEmailYPassword, verificarUsuario, olvidarContrasenia } from '../controllers/usuarios.controller'
const routes = Router()

routes.get('/listarUsuarios', listarUsuarios)
routes.post('/crearUsuario', crearUsuarios)
routes.post('/logearUsuario', logearUsuarioPorEmailYPassword)
routes.post('/verificarUsuario', verificarUsuario)
routes.get('/olvidarContrasenia', olvidarContrasenia)

export default routes
