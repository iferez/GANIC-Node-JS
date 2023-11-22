import { IProductoPago } from "./productos";

export interface IPago {
    email: string;
    monto: number;
    listaProductos: IProductoPago[];
}