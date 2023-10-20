import { Request, Response } from 'express'
import * as usuarioService from '../services/usuarios.services'
import { validationResult } from 'express-validator'

const listarUsuarios = (_req: Request, res: Response): Response => {
  return res.json(usuarioService.obtenerUsuarios())
}

const crearUsuarios = (req: Request, res: Response): Response => {
  const errors = validationResult(req)
  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  const usuario = usuarioService.agregarUsuario(req.body)
  console.log(usuario)
  return res.status(201).send(usuario)
}

const obtenerUsuarioPorUsername = (req: Request, res: Response): Response => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  const usuario = usuarioService.obtenerUsuarioPorUsername(req.query.q as string)
  return usuario != null ? res.json(usuario) : res.status(404).json({ mensaje: 'Usuario no encontrado' })
}

const obtenerUsuarioPorUsernameYPassword = (req: Request, res: Response): Response => {
  const errors = validationResult(req)
  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array())
  }
  const usuario = usuarioService.obtenerUsuarioPorUsernameYPassword(req.body.username as string, req.body.password as string)
  return usuario != null ? res.json(usuario) : res.status(404).json({ mensaje: 'Usuario o password incorrecto' })
}

export { listarUsuarios, crearUsuarios, obtenerUsuarioPorUsernameYPassword, obtenerUsuarioPorUsername }
