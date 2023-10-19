export interface ISandwich {
  id: number
  nombre: string
  descripcion: string
  clasificacion: string
  precio: number
}

export type SandwichInput = Omit<ISandwich, 'id'>
