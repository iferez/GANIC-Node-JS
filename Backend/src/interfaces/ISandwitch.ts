export interface ISandwich {
  id: number
  nombre: string
  descripcion: string
  clasificacion: string
  imagen?: string
  precio: number
}

export type SandwichInput = Omit<ISandwich, 'id'>

export type ISandwichPago = Pick<ISandwich, 'nombre' | 'precio'>
