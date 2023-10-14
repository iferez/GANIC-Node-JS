import { Request, Response } from 'express'
import * as sandwichService from '../services/sandwich'
import validarEntrada from '../utils'

const obtenerSandwitch = (_req: Request, res: Response): Response => {
  return res.send(sandwichService.obtenerSandwich())
}

const agregarSandwitch = (req: Request, res: Response): Response => {
  try {
    const sandwich = sandwichService.agregarSandwich(validarEntrada(req.body))
    return res.status(201).send(sandwich)
  } catch (error: any) {
    return res.status(400).send(error.message)
  }
}

const obtenerSandwichPorId = (req: Request, res: Response): Response => {
  const sandwich = sandwichService.obtenerSandwichPorId(Number(req.params.id))
  return sandwich != null ? res.send(sandwich) : res.status(404).send('Sandwich no encontrado')
}

export { obtenerSandwitch, agregarSandwitch, obtenerSandwichPorId }
