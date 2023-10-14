import { Router } from 'express'
import { obtenerIngredientes } from '../controllers/ingredientes'

const router = Router()

router.get('/', obtenerIngredientes)

export default router
