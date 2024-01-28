import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";

import { IResult, RESULT_OK, NOT_FOUND } from "../utils/interfaces/result.interface";
import { TagCreateDTO, TagUpdateDTO } from "./dtos/tag.dtos";
import { extractErrorKeysFromErrors } from "../utils/functions";
import { TagRepository } from "./tag.repository";

const tagRepository = new TagRepository();

export default class TagService {
  async create(tagData: TagCreateDTO): Promise<IResult> {
    const errors = await validate(tagData);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Error de validacion al crear una nueva etiqueta ${errors}.`,
        entity: null,
        resultkeys: errorKeys
      }
    }

    const tagCreated = await tagRepository.save(tagData);

    return {
      statusCode: StatusCodes.OK,
      message: 'Etiqueta creado con exito!',
      entity: tagCreated,
      resultkeys: [RESULT_OK]
    }
  }

  async update (id: number, tagData: TagUpdateDTO): Promise<IResult> {
    const errors = await validate(tagData);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Error de validacion al crear una nueva etiqueta ${errors}.`,
        entity: null,
        resultkeys: errorKeys
      }
    }

    const currentTag = await tagRepository.findOneBy({id});

    if (currentTag === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró una etiqueta con el ID: ${id}.`,
        entity: null,
        resultkeys: [NOT_FOUND]
      };
    }

    await tagRepository.update(currentTag.id, tagData);
    const updatedTag = await tagRepository.findOneBy({id});

    return {
      statusCode: StatusCodes.OK,
      message: 'La etiqueta ha sido actualizada exitosamente',
      entity: updatedTag,
      resultkeys: [RESULT_OK]
    }
  }

  async delete(id: number): Promise<IResult> {
    const tagToDelete = await tagRepository.findOneBy({id});

    if (tagToDelete === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró una etiqueta con el ID: ${id}.`,
        entity: null,
        resultkeys: [NOT_FOUND]
      }
    }

    await tagRepository.update(id, {deletedAt: new Date()});

    return {
      statusCode: StatusCodes.OK,
      message: `La etiqueta con ID ${id} fue eliminada con exito.`,
      entity: null,
      resultkeys: [RESULT_OK]
    }
  }

}
