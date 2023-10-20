import sandwichData from '../data/sandwitch.json'
import { ISandwich, SandwichInput } from '../interfaces/ISandwitch'
import fs from 'fs'

const arraySandwitch: ISandwich[] = sandwichData as ISandwich[]
const obtenerSandwich = (): ISandwich[] => {
  return arraySandwitch
}

const agregarSandwich = (sandwitchInput: SandwichInput): ISandwich => {
  const nuevoSandwich: ISandwich = {
    id: Math.max(...arraySandwitch.map((sandwich) => sandwich.id)) + 1,
    nombre: sandwitchInput.nombre,
    descripcion: sandwitchInput.descripcion,
    clasificacion: sandwitchInput.clasificacion,
    imagen: sandwitchInput.imagen,
    precio: sandwitchInput.precio
  }
  let jsonData = []
  try {
    jsonData = JSON.parse(fs.readFileSync('/home/cris/Documents/backend/src/data/sandwitch.json', 'utf8'))
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error)
  }

  // Agrega el nuevo sandwich al arreglo existente
  jsonData.push(nuevoSandwich)

  // Guarda los datos en el archivo JSON
  try {
    fs.writeFileSync('/home/cris/Documents/backend/src/data/sandwitch.json', JSON.stringify(jsonData, null, 2))
    console.log('Datos guardados con éxito')
  } catch (error) {
    console.error('Error al guardar los datos en el archivo JSON:', error)
    // Puedes lanzar el error o tomar otras medidas apropiadas aquí.
  }

  return nuevoSandwich
}

const obtenerSandwichPorId = (id: number): ISandwich | undefined => {
  return arraySandwitch.find((sandwich) => sandwich.id === id)
}

const obtenerListadoSandwichPorClasificacion = (clasificacion: string): ISandwich[] => {
  return arraySandwitch.filter((sandwich) => sandwich.clasificacion === clasificacion)
}

export { obtenerSandwich, agregarSandwich, obtenerSandwichPorId, obtenerListadoSandwichPorClasificacion }
