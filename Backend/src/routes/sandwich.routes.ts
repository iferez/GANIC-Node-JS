import Router from 'express'
import { obtenerSandwich, agregarSandwich, obtenerSandwichPorId } from '../controllers/sandwich'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', obtenerSandwich)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', obtenerSandwichPorId)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', agregarSandwich)

export default router
