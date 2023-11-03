import * as z from 'zod'

const obtenerUsuarioSchema = z.object({
  q: z.string()
    .min(3, 'El username debe tener al menos 3 caracteres')
    .max(10, 'El username no puede tener más de 10 caracteres')
})

const logearUsuarioSchema = z.object({
  email: z.string()
    .email('El email es inválido')
    .max(30, 'El email no puede tener más de 30 caracteres')
    .min(8, 'El email debe tener al menos 8 caracteres'),
  password: z.string()
    .max(8, 'El password no puede tener más de 8 caracteres')
    .min(8, 'El password debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'El password debe tener al menos una mayúscula, una minúscula y un número')
})

const verificarUsuarioSchema = z.object({
  email: z.string()
    .email('El email es inválido'),
  codigo: z.string()
    .length(6, 'El código debe tener exactamente 6 caracteres')
})

const agregarUsuarioSchema = z.object({
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre no puede tener más de 20 caracteres'),
  apellido: z.string()
    .min(3, 'El apellido debe tener al menos 3 caracteres')
    .max(20, 'El apellido no puede tener más de 20 caracteres'),
  email: z.string()
    .email('El email es inválido')
    .max(30, 'El email no puede tener más de 30 caracteres')
    .min(8, 'El email debe tener al menos 8 caracteres'),
  password: z.string()
    .max(8, 'El password no puede tener más de 8 caracteres')
    .min(8, 'El password debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'El password debe tener al menos una mayúscula, una minúscula y un número'),
  direccion: z.string()
    .max(50, 'La dirección no puede tener más de 50 caracteres')
    .min(8, 'La dirección debe tener al menos 8 caracteres'),
  username: z.string()
    .min(3, 'El username debe tener al menos 3 caracteres')
    .max(10, 'El username no puede tener más de 10 caracteres')
})

const olvidarContraseniaSchema = z.object({
  email: z.string()
    .email('El email es inválido')
    .max(30, 'El email no puede tener más de 30 caracteres')
    .min(8, 'El email debe tener al menos 8 caracteres')
})

export { obtenerUsuarioSchema, logearUsuarioSchema, verificarUsuarioSchema, agregarUsuarioSchema, olvidarContraseniaSchema }
