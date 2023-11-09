/* eslint-disable @typescript-eslint/promise-function-async */
import { ISandwich, SandwichInput } from '../interfaces/ISandwitch'
import SandwichModel from '../models/sandwich.model'

const obtenerTodosLosSandwiches = (): Promise<ISandwich[]> => {
  return new Promise<ISandwich[]>((resolve, reject) => {
    SandwichModel.findAll({})
      .then((sandwiches) => {
        resolve(sandwiches.map((el) => el.get({ plain: true })))
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

const agregarSandwich = (sandwitchInput: SandwichInput): Promise<ISandwich> => {
  return new Promise<ISandwich>((resolve, reject) => {
    SandwichModel.create(sandwitchInput)
      .then((sandwich) => {
        resolve(sandwich.get({ plain: true }))
      })
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          reject(new Error('El sandwich ya existe'))
        } else {
          reject(new Error('No se pudo agregar el sandwich'))
        }
      })
  })
}

const obtenerPorId = (id: number): Promise<ISandwich> => {
  return new Promise<ISandwich>((resolve, reject) => {
    SandwichModel.findByPk(id)
      .then((sandwich) => {
        if (sandwich != null) {
          resolve(sandwich.get({ plain: true }))
        } else {
          reject(new Error('No se encontró el sandwich'))
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const obtenerListadoSandwichPorClasificacion = (clasificacion: string): Promise<ISandwich[]> => {
  return new Promise<ISandwich[]>((resolve, reject) => {
    SandwichModel.findAll({ where: { clasificacion } })
      .then((sandwiches) => {
        resolve(sandwiches.map((el) => el.get({ plain: true })))
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export { obtenerTodosLosSandwiches, agregarSandwich, obtenerPorId, obtenerListadoSandwichPorClasificacion }
