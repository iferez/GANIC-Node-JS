import { Request, Response } from 'express'
import * as sandwichService from '../services/sandwich.service'
import { SandwichInput } from '../interfaces/ISandwitch'
import * as validacionSandwich from '../validators/sandwich.validators'

const obtenerSandwich = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const sandwiches = await sandwichService.obtenerTodosLosSandwiches()
    return res.status(200).json(sandwiches)
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const agregarSandwich = async (req: Request, res: Response): Promise<Response> => {
  try {
    const datosValidos = validacionSandwich.agregarSandwitchSchema.parse(req.body)
    const imagen = req.file
    if (imagen != null) {
      const nuevoSandwich: SandwichInput = {
        nombre: datosValidos.nombre,
        precio: datosValidos.precio,
        descripcion: datosValidos.descripcion,
        clasificacion: datosValidos.clasificacion,
        imagen: imagen.filename
      }
      await sandwichService.agregarSandwich(nuevoSandwich)
      return res.status(201).json(req.body)
    }
    return res.status(400).json({ error: 'No se ha proporcionado una imagen' })
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const obtenerSandwichPorId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const validarId = validacionSandwich.obtenerSandwichPorIdSchema.parse(req.query)
    const sandwich = await sandwichService.obtenerPorId(validarId.id)
    if (sandwich == null) {
      return res.status(404).json({ error: 'Sándwich no encontrado' })
    }
    return res.status(200).json(sandwich)
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const obtenerListadoSandwichPorClasificacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const validarPreferencia = validacionSandwich.obtenerListadoSandwichPorClasificacionSchema.parse(req.body)
    const sandwich = sandwichService.obtenerListadoSandwichPorClasificacion(validarPreferencia.clasificacion)
    return Object.keys(sandwich).length !== 0 ? res.json(sandwich) : res.status(400).json({ mensaje: 'No existen sandwitch para esa clasificación' })
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export { obtenerSandwich, agregarSandwich, obtenerSandwichPorId, obtenerListadoSandwichPorClasificacion }
