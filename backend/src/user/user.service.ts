import { validate } from "class-validator";
import bcrypt from 'bcrypt';

import { IResult, RESULT_OK } from "../utils/interfaces/result.interface";
import { UserCreateDTO } from "./dtos/user.dtos";
import { extractErrorKeysFromErrors } from "../utils/functions";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "./user.repository";

const userRepository = new UserRepository()

export default class UserService {
  async create (userCreateDTO: UserCreateDTO): Promise<IResult> {
    const errors = await validate(userCreateDTO);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Error de validacion al crear un nuevo usuario ${errors}.`,
        entity: null,
        resultkeys: errorKeys
      }
    }

    const userFound = await userRepository.findOneBy({email: userCreateDTO.email});

    if (userFound !== null) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'El email ya se encuentra registrado.',
        entity: null,
        resultkeys: ['email-already-registered']
      }
    }

    if (userCreateDTO.password !== userCreateDTO.confirmPassword) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Las contraseñas no coinciden, por favor intente de nuevo.',
        entity: null,
        resultkeys: ['password-not-match']
      }
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userCreateDTO.password, salt);
    const {confirmPassword, ...restUserData} = userCreateDTO;

    const userCreated = await userRepository.save({...restUserData, password});

    return {
      statusCode: StatusCodes.OK,
      message: 'Usuario creado con exito!',
      entity: userCreated,
      resultkeys: [RESULT_OK]
    }
  }
}