import * as z from 'zod'

const obtenerPagoSchema = z.object({
  email: z.string()
    .email('El email es inválido')
    .min(3)
    .max(100),
  monto: z.number()
    .int()
    .positive(),
  listaProductos: z.array(z.object({
    nombre: z.string()
      .min(3)
      .max(100),
    precio: z.string()
  }))
})

export { obtenerPagoSchema }
