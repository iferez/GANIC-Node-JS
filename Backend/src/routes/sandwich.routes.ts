/* eslint-disable  @typescript-eslint/no-misused-promises */
import Router from 'express'
import { obtenerSandwich, agregarSandwich, obtenerSandwichPorId, obtenerListadoSandwichPorClasificacion } from '../controllers/sandwich.controller'
import { upload } from '../middleware/guardarImagenes'

const router = Router()

router.get('/listarSandwitch', obtenerSandwich)

router.get('/obtenerSandwitch', obtenerSandwichPorId)

router.post('/crearSandwitch', upload.single('imagen'), agregarSandwich)

router.post('/obtenerSandwitchPorClasificacion', obtenerListadoSandwichPorClasificacion)

export default router
