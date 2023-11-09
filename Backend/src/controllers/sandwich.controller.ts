/* eslint-disable @typescript-eslint/promise-function-async */
import { Request, Response } from 'express'
import * as sandwichService from '../services/sandwich.service'
import { SandwichInput } from '../interfaces/ISandwitch'
import * as validacionSandwich from '../validators/sandwich.validators'

const obtenerSandwich = (_req: Request, res: Response): Promise<Response> => {
  return sandwichService.obtenerTodosLosSandwiches()
    .then((sandwiches) => {
      return res.status(200).json(sandwiches)
    })
    .catch((_error) => {
      return res.status(500).json({ error: 'Error interno del servidor' })
    })
}

const agregarSandwich = (req: Request, res: Response): Promise<Response> => {
  console.log(req)
  console.log(req.file)
  return validacionSandwich.agregarSandwitchSchema.parseAsync(req.body)
    .then((datosValidos) => {
      console.log(req.file)
      const imagen = req.file
      if (imagen !== undefined && imagen !== null) {
        const nuevoSandwich: SandwichInput = {
          nombre: datosValidos.nombre,
          precio: datosValidos.precio,
          descripcion: datosValidos.descripcion,
          clasificacion: datosValidos.clasificacion,
          imagen: imagen.filename
        }
        return sandwichService.agregarSandwich(nuevoSandwich)
          .then(() => res.status(201).json(req.body))
          .catch((error) => {
            return res.status(500).json({ error: error.message })
          })
      } else {
        return res.status(400).json({ error: 'No se ha proporcionado una imagen' })
      }
    })
    .catch((error) => {
      return res.status(400).json({ error: error.message })
    })
}

const obtenerSandwichPorId = (req: Request, res: Response): Promise<Response> => {
  return validacionSandwich.obtenerSandwichPorIdSchema.parseAsync(req.query)
    .then((validarId) => {
      return sandwichService.obtenerPorId(validarId.id)
        .then((sandwich) => {
          if (sandwich === null) {
            return res.status(404).json({ error: 'Sándwich no encontrado' })
          }
          return res.status(200).json(sandwich)
        })
        .catch((_error) => {
          return res.status(500).json({ error: 'Error interno del servidor' })
        })
    })
    .catch((_error) => {
      return res.status(400).json({ error: 'Datos de solicitud no válidos' })
    })
}

const obtenerListadoSandwichPorClasificacion = (req: Request, res: Response): Promise<Response> => {
  return validacionSandwich.obtenerListadoSandwichPorClasificacionSchema.parseAsync(req.body)
    .then((validarPreferencia) => {
      const sandwich = sandwichService.obtenerListadoSandwichPorClasificacion(validarPreferencia.clasificacion)
      if (Object.keys(sandwich).length !== 0) {
        return res.json(sandwich)
      } else {
        return res.status(400).json({ mensaje: 'No existen sándwich para esa clasificación' })
      }
    })
    .catch((_error) => {
      return res.status(400).json({ error: 'Datos de solicitud no válidos' })
    })
    .catch((_error) => {
      return res.status(500).json({ error: 'Error interno del servidor' })
    })
}

export { obtenerSandwich, agregarSandwich, obtenerSandwichPorId, obtenerListadoSandwichPorClasificacion }
