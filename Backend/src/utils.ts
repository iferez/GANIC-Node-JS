import { SandwichInput } from './interfaces/ISandwitch'

const isString = (dato: string): boolean => {
  return typeof dato === 'string'
}

const isNumber = (numero: number): boolean => {
  return typeof numero === 'number'
}

const parseNombre = (nombre: any): string => {
  if (!isString(nombre)) {
    throw new Error('El nombre no es un string')
  }
  return nombre
}

const parseDescripcion = (desc: any): string => {
  if (!isString(desc)) {
    throw new Error('La Descripcion no es un string')
  }
  return desc
}

const parseClasificicacion = (clas: any): string => {
  if (!isString(clas)) {
    throw new Error('La clasificacion no es un string')
  }
  return clas
}

const parsePrecio = (precio: any): number => {
  if (!isNumber(precio)) {
    throw new Error('El precio no es un numero')
  }
  return precio
}

const validarEntrada = (object: any): SandwichInput => {
  const nuevoSandwich: SandwichInput = {
    Nombre: parseNombre(object.Nombre),
    Descripcion: parseDescripcion(object.Descripcion),
    Clasificacion: parseClasificicacion(object.Clasificacion),
    Precio: parsePrecio(object.Precio)
  }
  return nuevoSandwich
}

export default validarEntrada
