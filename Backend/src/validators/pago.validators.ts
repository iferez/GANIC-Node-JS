import * as z from 'zod'

const obtenerPagoSchema = z.object({
  email: z.string()
    .email()
    .min(3)
    .max(100),
  monto: z.number()
    .int()
    .positive(),
  listaProductos: z.array(z.object({
    id: z.number()
      .int()
      .positive(),
    nombre: z.string()
      .min(3)
      .max(100),
    precio: z.string(),
    descripcion: z.string()
      .min(10)
      .max(100)
  }))
})

export { obtenerPagoSchema }