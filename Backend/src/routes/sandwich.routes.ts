import Router from 'express'
import { obtenerSandwitch, agregarSandwitch, obtenerSandwichPorId } from '../controllers/sandwich'

const router = Router()

router.get('/', obtenerSandwitch)
router.get('/:id', obtenerSandwichPorId)
router.post('/', agregarSandwitch)

export default router
