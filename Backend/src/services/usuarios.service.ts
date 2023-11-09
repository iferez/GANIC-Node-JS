/* eslint-disable @typescript-eslint/promise-funciton-async */
import { IUsuario, IUsuarioInput } from '../interfaces/IUsuario'
import UsuarioModel from '../models/usuario.model'

const obtenerUsuarios = (): Promise<IUsuario[]> => {
  return UsuarioModel.findAll()
    .then((usuarios) => usuarios.map((el) => el.get({ plain: true })))
    .catch((error) => {
      console.log(error)
      throw error
    })
}

const agregarUsuario = (usuario: IUsuarioInput): Promise<IUsuario> => {
  return UsuarioModel.create(usuario)
    .then((usuario) => usuario.get({ plain: true }))
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const obtenerUsuarioPorEmail = (email: string): Promise<IUsuario> => {
  return UsuarioModel.findOne({ where: { email } })
    .then((usuario) => {
      if (usuario === null) {
        throw new Error('El usuario no fue encontrado');
      }
      return usuario.get({ plain: true });
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const logearUsuario = (email: string, pass: string): Promise<IUsuario> => {
  let usuarioEncontrado: IUsuario;

  return UsuarioModel.findOne({ where: { email } })
    .then((usuario) => {
      if (usuario == null) {
        throw new Error('El usuario no fue encontrado');
      }
      usuarioEncontrado = usuario.get({ plain: true });

      if (usuarioEncontrado.password !== pass) {
        throw new Error('La contraseña es incorrecta');
      }

      return usuarioEncontrado;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export { obtenerUsuarioPorEmail, obtenerUsuarios, agregarUsuario, logearUsuario }
