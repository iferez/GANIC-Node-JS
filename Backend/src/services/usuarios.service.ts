/* eslint-disable @typescript-eslint/promise-function-async */
import { IUsuario, IUsuarioInput } from '../interfaces/IUsuario'
import UsuarioModel from '../models/usuario.model'

const obtenerUsuarios = (): Promise<IUsuario[]> => {
  if (process.env.CREATE_TABLES === 'si') {
    UsuarioModel.sync().catch((error) => { throw new Error(error.message) })
  }
  return UsuarioModel.findAll()
    .then((usuarios) => usuarios.map((el) => el.get({ plain: true })))
    .catch((error) => { throw new Error(error.message) })
}

const agregarUsuario = (usuario: IUsuarioInput): Promise<IUsuario> => {
  return UsuarioModel.create(usuario)
    .then((usuario) => usuario.get({ plain: true }))
    .catch((error) => { throw new Error(error.message) })
}

const obtenerUsuarioPorEmail = (email: string): Promise<IUsuario> => {
  return UsuarioModel.findOne({ where: { email } })
    .then((usuario) => {
      if (usuario === null) {
        throw new Error('El usuario no fue encontrado')
      }
      return usuario.get({ plain: true })
    })
    .catch((error) => { throw new Error(error.message) })
}

export { obtenerUsuarioPorEmail, obtenerUsuarios, agregarUsuario }
