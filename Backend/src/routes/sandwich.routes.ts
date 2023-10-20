import Router from 'express'
import { check } from 'express-validator'
import { obtenerSandwitch, agregarSandwitch, obtenerSandwichPorId, obtenerListadoSandwichPorClasificacion } from '../controllers/sandwitch.controller'

const router = Router()

router.get('/listarSandwitch', obtenerSandwitch)

router.get('/obtenerSandwitch/:id', obtenerSandwichPorId)

router.post('/crearSandwitch', [
  check('nombre').notEmpty().isString().trim().escape().isLength({ max: 10 }).isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres y maximo 10'),
  check('precio').notEmpty().isNumeric().trim().escape().withMessage('El precio debe ser numerico'),
  check('descripcion').notEmpty().isString().trim().escape().isLength({ max: 40 }).withMessage('La descripcion debe tener al menos 10 caracteres'),
  check('clasificacion').notEmpty().isString().trim().escape().isLength({ max: 40 }).withMessage('La clasificacion debe tener al menos 10 caracteres')
], agregarSandwitch)

router.post('/obtenerSandwitchPorClasificacion', [
  check('clasificacion').notEmpty().isString().trim().escape().isLength({ max: 40 }).withMessage('La clasificacion debe tener al menos 10 caracteres')
], obtenerListadoSandwichPorClasificacion)

export default router
