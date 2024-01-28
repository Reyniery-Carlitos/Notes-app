import { LoginDTO } from "./dtos/login.dtos";
import { StatusCodes } from "http-status-codes";
import { validate } from "class-validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { ILoginDataResult, NOT_FOUND, RESULT_OK, TokenUser } from "../utils/interfaces/result.interface";
import { extractErrorKeysFromErrors } from "../utils/functions";
import { UserRepository } from "../user/user.repository";

const userRepository = new UserRepository();

export class LoginService {
  async login(user: LoginDTO): Promise<ILoginDataResult> {
    const errors = await validate(user);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Hubo un error al iniciar sesion: ${errors}`,
        token: null,
        entity: null,
        resultkeys: errorKeys
      }
    }

    const currentUser = await userRepository.findOneBy({email: user.email});
    if (currentUser === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Usuario o contraseña incorrecto!',
        token: null,
        entity: null,
        resultkeys: [NOT_FOUND]
      }
    }

    const isCorrectPassword = await bcrypt.compare(user.password, currentUser.password);

    if (!isCorrectPassword) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Usuario o contraseña incorrecto!',
        token: null,
        entity: null,
        resultkeys: [NOT_FOUND]
      };
    }

    const token = jwt.sign({id: currentUser.id, username: currentUser.username}, process.env.JWT_SECRET as string);

    return {
      statusCode: StatusCodes.OK,
      message: 'Se ha iniciado sesion exitosamente.',
      token,
      entity: currentUser,
      resultkeys: [RESULT_OK]
    }
  }
}