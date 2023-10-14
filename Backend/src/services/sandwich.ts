import sandwichData from '../data/sandwitch.json'
import { ISandwich, SandwichInput } from '../interfaces/ISandwitch'

const arraySandwitch: ISandwich[] = sandwichData as ISandwich[]
const obtenerSandwich = (): ISandwich[] => {
  return arraySandwitch
}

const agregarSandwich = (sandwitchInput: SandwichInput): ISandwich => {
  const nuevoSandwich: ISandwich = {
    id: Math.max(...arraySandwitch.map((sandwich) => sandwich.id)) + 1,
    Nombre: sandwitchInput.Nombre,
    Descripcion: sandwitchInput.Descripcion,
    Clasificacion: sandwitchInput.Clasificacion,
    Precio: sandwitchInput.Precio
  }
  sandwichData.push(nuevoSandwich)
  return nuevoSandwich
}

const obtenerSandwichPorId = (id: number): ISandwich | undefined => {
  return arraySandwitch.find((sandwich) => sandwich.id === id)
}

export { obtenerSandwich, agregarSandwich, obtenerSandwichPorId }
