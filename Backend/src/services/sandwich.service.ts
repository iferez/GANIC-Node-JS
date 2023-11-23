/* eslint-disable @typescript-eslint/promise-function-async */
import { ISandwich, SandwichInput } from '../interfaces/ISandwitch'
import SandwichModel from '../models/sandwich.model'

const obtenerTodosLosSandwiches = (): Promise<ISandwich[]> => {
  if (process.env.CREATE_TABLES === 'si') {
    SandwichModel.sync().catch((error) => { throw new Error(error.message) })
  }
  return SandwichModel.findAll({})
    .then((sandwiches) => sandwiches.map((el) => el.get({ plain: true })))
    .catch((_error) => { throw new Error('Error al obtener los sandwiches') })
}

const agregarSandwich = (sandwitchInput: SandwichInput): Promise<ISandwich> => {
  return SandwichModel.create(sandwitchInput)
    .then((sandwich) => sandwich.get({ plain: true }))
    .catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('El sandwich ya existe')
      } else {
        throw new Error('No se pudo agregar el sandwich')
      }
    })
}

const obtenerPorId = (id: number): Promise<ISandwich> => {
  return SandwichModel.findByPk(id)
    .then((sandwich) => {
      if (sandwich == null) {
        throw new Error('No se encontró el sandwich')
      }
      return sandwich.get({ plain: true })
    })
    .catch((error) => { throw new Error(error.message) })
}

const obtenerListadoSandwichPorClasificacion = (clasificacionSeleccionado: string): Promise<ISandwich[]> => {
  return SandwichModel.findAll({ where: { clasificacion: clasificacionSeleccionado } })
    .then((sandwiches) => sandwiches.map((el) => el.get({ plain: true })))
    .catch((error) => { throw new Error(error.message) })
}

export { obtenerTodosLosSandwiches, agregarSandwich, obtenerPorId, obtenerListadoSandwichPorClasificacion }
