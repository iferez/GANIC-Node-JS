import { Request, Response } from 'express'
import * as sandwichService from '../services/sandwitch.services'
import { validationResult } from 'express-validator'
import { SandwichInput } from '../interfaces/ISandwitch'

const obtenerSandwitch = (_req: Request, res: Response): Response => {
  console.log('entrando a obtenerListadoSandwich')
  return res.json(sandwichService.obtenerSandwich())
}

const agregarSandwitch = (req: Request, res: Response): Response => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  const nuevoSandwich: SandwichInput = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    clasificacion: req.body.clasificacion,
    imagen: req.body.imagen,
    precio: req.body.precio
  }
  const sandwich = sandwichService.agregarSandwich(nuevoSandwich)
  return res.status(201).json(sandwich)
}

const obtenerSandwichPorId = (req: Request, res: Response): Response => {
  const sandwich = sandwichService.obtenerSandwichPorId(Number(req.params.id))
  return sandwich != null ? res.json(sandwich) : res.status(404).json({ mensaje: 'Sandwich no encontrado' })
}

const obtenerListadoSandwichPorClasificacion = (req: Request, res: Response): Response => {
  console.log('entrando a obtenerListadoSandwichPorClasificacion')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  const sandwich = sandwichService.obtenerListadoSandwichPorClasificacion(req.body.clasificacion)
  return Object.keys(sandwich).length !== 0 ? res.json(sandwich) : res.status(400).json({ mensaje: 'No existen sandwitch para esa clasificación' })
}

export { obtenerSandwitch, agregarSandwitch, obtenerSandwichPorId, obtenerListadoSandwichPorClasificacion }
