import { Request, Response } from 'express'
import * as usuarioService from '../services/usuarios.service'
import * as cognitoService from '../services/cognito.service'
import { IUsuarioCognito } from '../interfaces/IUsuario'
import * as validacionUsuario from '../validators/usuarios.validators'
import * as AuthService from '../services/auth.service'

// #region Lista de usuarios
const listarUsuarios = async (_req: Request, res: Response): Promise<Response> => {
  try {
    return await usuarioService.obtenerUsuarios()
      .then((usuarios) => res.status(200).json(usuarios))
      .catch((error) => res.status(500).json({ error: error.message }))
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
// #endregion

// #region Crear usuario
const crearUsuarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const datosValidos = validacionUsuario.agregarUsuarioSchema.parse(req.body)
    const usuarioCognito: IUsuarioCognito = {
      username: datosValidos.username,
      email: datosValidos.email,
      password: datosValidos.password
    }
    return await cognitoService.registrarUsuario(usuarioCognito)
      .then(async (token: string) => {
        console.log('token ==> ', token)
        return await usuarioService.agregarUsuario(req.body)
          .then((_usuario) => res.status(201).json(token))
          .catch((error) => res.status(500).json({ error: error.message }))
      })
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}
// #endregion

// #region Obtener usuario por username
const obtenerUsuarioPorUsername = async (req: Request, res: Response): Promise<Response> => {
  try {
    const datosValidos = validacionUsuario.obtenerUsuarioSchema.parse(req.query)
    const usuario = await usuarioService.obtenerUsuarioPorUsername(datosValidos.q)
    return res.status(200).json(usuario)
  } catch (error: any) {
    return res.status(404).json({ error: error.message })
  }
}
// #endregion

// #region Logear usuario por email y password
const logearUsuarioPorEmailYPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const datosValidos = validacionUsuario.logearUsuarioSchema.parse(req.body)
    const { email, password } = datosValidos
    return await cognitoService.logearUsuario(email, password) // <== pasarlo como object
      .then(async () => {
        return await usuarioService.obtenerUsuarioPorEmail(email)
          .then((usuario) => res.status(200).json({ token: AuthService.generarJWT(usuario.email, usuario.rol) }))
      })
      .catch((error) => res.status(500).json({ error: error.message }))
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
// #endregion

// #region Verificar usuario
const verificarUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const datosValidos = validacionUsuario.verificarUsuarioSchema.parse(req.body)
    const { email, codigo } = datosValidos
    return await cognitoService.confirmarUsuario(email, codigo) // <== pasarlo como object
      .then(async (token: string) => res.status(200).json(token))
      .catch((error) => res.status(500).json({ error: error.message }))
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
// #endregion

// #region Olvidar contraseña
const olvidarContrasenia = async (req: Request, res: Response): Promise<Response> => {
  try {
    const datosValidos = validacionUsuario.olvidarContraseniaSchema.parse(req.query)
    const email: string = datosValidos.email
    return await cognitoService.olvidarContrasenia(email)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json({ error: error.message }))
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
// #endregion

export { listarUsuarios, crearUsuarios, logearUsuarioPorEmailYPassword, obtenerUsuarioPorUsername, verificarUsuario, olvidarContrasenia }
