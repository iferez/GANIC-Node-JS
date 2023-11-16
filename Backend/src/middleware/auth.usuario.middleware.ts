import { NextFunction } from 'express';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');

// @ts-ignore
export const autorizado = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(403).json({ message: 'Token de autorización no proporcionado' });
    }

    const token = authorizationHeader.split(' ')[1];

    // @ts-ignore
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido' });
        }

        const rol = decoded?.rol;

        if (!rol) {
            return res.status(401).json({ message: 'Rol no especificado en el token' });
        }

        if (rol === 'Administrador') {
            next();
        } else {
            return res.status(401).json({ message: 'No permitido' });
        }
    });
};
