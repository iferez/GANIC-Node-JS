/* eslint-disable @typescript-eslint/promise-funciton-async */
import { Request, Response } from 'express'
import * as usuarioService from '../services/usuarios.service'
import * as cognitoService from '../services/cognito.service'
import { IUsuarioCognito } from '../interfaces/IUsuario'
import * as validacionUsuario from '../validators/usuarios.validators'
import * as AuthService from '../services/auth.service'

const listarUsuarios = (_req: Request, res: Response): Promise<Response> => {
  return usuarioService.obtenerUsuarios()
    .then((usuarios) => res.status(200).json(usuarios))
    .catch((error) => res.status(500).json({ error: error.message }))
    .catch(() => res.status(500).json({ error: 'Error interno del servidor' }))
}

const crearUsuarios = (req: Request, res: Response): Promise<Response> => {
  const datosValidos = validacionUsuario.agregarUsuarioSchema.parse(req.body);
  const usuarioCognito: IUsuarioCognito = {
    username: datosValidos.username,
    email: datosValidos.email,
    password: datosValidos.password,
  };

  return cognitoService
    .registrarUsuario(usuarioCognito)
    .then((token: string) => {
      console.log('token ==> ', token);
      return usuarioService
        .agregarUsuario(req.body)
        .then(() => res.status(201).json(token))
        .catch((error) => res.status(500).json({ error: error.message }));
    })
    .catch((error: any) => res.status(404).json({ error: error.message }));
};

const logearUsuarioPorEmailYPassword = (req: Request, res: Response): any => {  /* Promise<Response> */
  try {
    const datosValidos = validacionUsuario.logearUsuarioSchema.parse(req.body);
    const { email, password } = datosValidos;

    return cognitoService.logearUsuario(email, password)
      .then(() => usuarioService.obtenerUsuarioPorEmail(email))
      .then((usuario) => res.status(200).json({ token: AuthService.generarJWT(usuario.email, usuario.rol) }))
      .catch((error) => res.status(500).json({ error: error.message }));
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const verificarUsuario = (req: Request, res: Response): any => {
  try {
    const datosValidos = validacionUsuario.verificarUsuarioSchema.parse(req.body);
    const { email, codigo } = datosValidos;

    return cognitoService
      .confirmarUsuario(email, codigo)
      .then((token: string) => res.status(200).json(token))
      .catch((error) => res.status(500).json({ error: error.message }));
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const olvidarContrasenia = (req: Request, res: Response): any => {
  try {
    const datosValidos = validacionUsuario.olvidarContraseniaSchema.parse(req.query);
    const email: string = datosValidos.email;

    return cognitoService
      .olvidarContrasenia(email)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json({ error: error.message }));
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export { listarUsuarios, crearUsuarios, logearUsuarioPorEmailYPassword, verificarUsuario, olvidarContrasenia }
