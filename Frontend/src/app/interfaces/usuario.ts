export interface IUsuario{
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    password: string;
    direccion: string;
}

export type IUsuarioLogin = Omit<IUsuario, 'id' | 'nombre' | 'apellido' | 'direccion' | 'username'>;