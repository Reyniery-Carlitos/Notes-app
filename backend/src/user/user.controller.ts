import { type Request, type Response } from "express";

import UserService from "./user.service";
import { StatusCodes } from "http-status-codes";
import { plainToInstance } from "class-transformer";
import { UserCreateDTO } from "./dtos/user.dtos";

const userService = new UserService();

export default class UserController {
  async create (req: Request, res: Response): Promise<void> {
    try {
      const user = plainToInstance(UserCreateDTO, req.body);
      const result = await userService.create(user);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: { result: result.entity },
          resultKeys: result.resultkeys
        })

    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error de servidor: ${err}`)
    }
  }
}