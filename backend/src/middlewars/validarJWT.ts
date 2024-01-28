import { type Response, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { CustomRequest, TokenUser } from "../utils/interfaces/result.interface";

export default async function validarJWT(req: CustomRequest, res: Response, next: NextFunction): Promise<void | Response> {
  try {
    const authorization = req.get('x-token');
    let token = null;

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as TokenUser;

    if (!token || !decodedToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({message: 'No hay token en la peticion'})
    }

    req.user = decodedToken;

    next()
  } catch(err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ mensaje: "Token no valido" });
  }

}