import * as z from 'zod'

const obtenerSandwichPorIdSchema = z.object({
  id: z.number()
    .int()
    .positive()
})

const obtenerListadoSandwichPorClasificacionSchema = z.object({
  clasificacion: z.string()
    .min(3)
    .max(40)
})

const agregarSandwitchSchema = z.object({
  nombre: z.string()
    .min(3)
    .max(30),
  precio: z.number()
    .int()
    .positive(),
  descripcion: z.string()
    .min(10)
    .max(100),
  clasificacion: z.string()
    .min(3)
    .max(40)
})

const obtenerSandwichPorClasificacionSchema = z.object({
  clasificacion: z.string()
    .min(3)
    .max(40)
})

export { obtenerSandwichPorIdSchema, obtenerListadoSandwichPorClasificacionSchema, agregarSandwitchSchema, obtenerSandwichPorClasificacionSchema }
