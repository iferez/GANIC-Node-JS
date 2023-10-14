export interface ISandwich {
  id: number
  Nombre: string
  Descripcion: string
  Clasificacion: string
  Precio: number
}

export type SandwichInput = Omit<ISandwich, 'id'>
