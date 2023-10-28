import { Request, Response } from 'express'
import * as sService from '../services/sandwich.service'
import { validationResult } from 'express-validator'

const obtenerSandwich = async function (_req: Request, res: Response): Promise<void> {
  try {
    const sandwiches = await sService.obtenerTodosLosSandwiches()
    res.status(200).json(sandwiches)
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
const obtenerSandwichPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const sandwich = await sService.obtenerPorId(id)
    if (sandwich != null) {
      res.status(200).json(sandwich)
    } else {
      res.status(404).json({ error: 'Sándwich no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const agregarSandwich = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json(errors.array())
  try {
    await sService.agregarSandwich((req.body))
    return res.status(201).json(req.body)
  } catch (error: any) {
    console.log(error)
    return res.status(404).json({ error: error.message })
  }
}

export { obtenerSandwich, agregarSandwich, obtenerSandwichPorId }
