import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { plainToInstance } from "class-transformer";

import { LoginDTO } from "./dtos/login.dtos";
import { LoginService } from "./login.service";

const loginService = new LoginService();

export class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (email === undefined || password === undefined) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send("Por favor, ingrese su email y contraseña.");
      }

      const loginData = plainToInstance(LoginDTO, req.body);
      const result = await loginService.login(loginData);

      res.status(result.statusCode).json({
        message: result.message,
        data: { token: result.token, result: result.entity },
        resultKeys: result.resultkeys
      });

      return
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error de servidor: ${err}`);
    }
  }
}
