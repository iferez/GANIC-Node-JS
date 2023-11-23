/* eslint-disable @typescript-eslint/no-misused-promises */
import Router from 'express'
import { pagarOrdenDePago } from '../controllers/pago.controller'
import { verficarToken } from '../middleware/verificarToken.middleware'

const router = Router()

router.post('/pagarOrden', verficarToken, pagarOrdenDePago)

export default router
