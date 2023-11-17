export interface IUsuario{
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    password: string;
    direccion: string;
    rol?: string;
}

export type IUsuarioLogin = Pick<IUsuario, 'email' | 'password'>;

export type IToken = Pick<IUsuario, 'email' | 'rol'>;