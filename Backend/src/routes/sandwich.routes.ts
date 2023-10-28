/* eslint-disable  @typescript-eslint/no-misused-promises */
import Router from 'express'
import { check } from 'express-validator'
import { obtenerSandwich, agregarSandwich, obtenerSandwichPorId } from '../controllers/sandwich'

const router = Router()

router.get('/listarSandwich', obtenerSandwich)

router.get('/obtenerSandwich/:id', obtenerSandwichPorId)

router.post('/crearSandwitch', [
  check('nombre').notEmpty().isString().trim().escape().isLength({ max: 10 }).isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres y maximo 10'),
  check('precio').notEmpty().isNumeric().trim().escape().withMessage('El precio debe ser numerico'),
  check('descripcion').notEmpty().isString().trim().escape().isLength({ max: 40 }).withMessage('La descripcion debe tener al menos 10 caracteres'),
  check('clasificacion').notEmpty().isString().trim().escape().isLength({ max: 40 }).withMessage('La clasificacion debe tener al menos 10 caracteres')
], agregarSandwich)

router.post('/obtenerSandwitchPorClasificacion', [
  check('clasificacion').notEmpty().isString().trim().escape().isLength({ max: 40 }).withMessage('La clasificacion debe tener al menos 10 caracteres')
])

export default router
