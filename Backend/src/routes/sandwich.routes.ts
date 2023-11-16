/* eslint-disable  @typescript-eslint/no-misused-promises */
import Router from 'express'
import { obtenerSandwich, agregarSandwich, obtenerSandwichPorId, obtenerListadoSandwichPorClasificacion } from '../controllers/sandwich.controller'
import { upload } from '../middleware/guardarImagenes'
import {autorizado} from "../middleware/auth.usuario.middleware";

const router = Router()

router.get('/listarSandwitch',obtenerSandwich)

router.get('/obtenerSandwitch', obtenerSandwichPorId)

router.post('/crearSandwitch', autorizado, upload.single('imagen'), agregarSandwich)

router.post('/obtenerSandwitchPorClasificacion', obtenerListadoSandwichPorClasificacion)

export default router
