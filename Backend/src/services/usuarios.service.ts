import { IUsuario, IUsuarioInput } from '../interfaces/IUsuario'
import UsuarioModel from '../models/usuario.model'

const agregarUsuario = async (usuario: IUsuarioInput): Promise<IUsuario> => {
  // encriptar el password y reasignarlo al usuario
  return await UsuarioModel.create(usuario).then((usuario) => { // <== se guarda en texto plano
    return usuario.get({ plain: true })
  }).catch((error) => {
    console.log(error)
    throw error
  })
}

const obtenerUsuarios = async (): Promise<IUsuario[]> => {
  return await UsuarioModel.sync()
    .then(async () => {
      return await UsuarioModel.findAll({})
    }).then((usuarios) => {
      return usuarios.map((el) => el.get({ plain: true }))
    }).catch((error) => {
      console.log(error)
      throw error
    })
}

const obtenerUsuarioPorEmail = async (email: string): Promise<IUsuario> => {
  const usuario = await UsuarioModel.findOne({ where: { email } })
  if (usuario === null) {
    throw new Error('El usuario no fue encontrado')
  }
  return usuario.get({ plain: true })
}

const obtenerUsuarioPorId = async (id: number): Promise<IUsuario> => {
  const usuario = await UsuarioModel.findByPk(id)
  if (usuario === null) {
    throw new Error('El usuario no fue encontrado')
  }
  return usuario.get({ plain: true })
}

const obtenerUsuarioPorUsername = async (user: string): Promise<IUsuario> => {
  console.log('user', user)
  return await UsuarioModel.findOne({ where: { username: user } }).then((usuario) => {
    if (usuario === null) {
      throw new Error('El usuario no fue encontrado')
    }
    return usuario.get({ plain: true })
  }, (error) => {
    console.log(error)
    throw error
  })
}

const logearUsuario = async (email: string, pass: string): Promise<IUsuario> => {
  let usuarioEncontrado: IUsuario
  return await UsuarioModel.findOne({ where: { email } })
    .then(async (usuario) => {
      if (usuario == null) {
        throw new Error('El usuario no fue encontrado')
      }
      usuarioEncontrado = usuario.get({ plain: true })
      if (usuarioEncontrado.password !== pass) {
        throw new Error('La contraseña es incorrecta')
      }
      return usuarioEncontrado
    })
    .catch((error) => {
      throw error
    })
}

export { obtenerUsuarioPorEmail, obtenerUsuarios, obtenerUsuarioPorId, obtenerUsuarioPorUsername, agregarUsuario, logearUsuario }
