import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";

import { IResult, RESULT_OK, NOT_FOUND } from "../utils/interfaces/result.interface";
import { CategoryUpdateDTO, CategoryCreateDTO } from "./dtos/category.dtos";
import { extractErrorKeysFromErrors } from "../utils/functions";
import { CategoryRepository } from "./category.repository";
import { Category } from "./category.entity";

const categoryRepository = new CategoryRepository();

export default class TagService {
  async create(categoryData: CategoryCreateDTO): Promise<IResult> {
    const errors = await validate(categoryData);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Error de validacion al crear una nueva categoria ${errors}.`,
        entity: null,
        resultkeys: errorKeys
      }
    }

    const categoryCreated = await categoryRepository.save(categoryData);

    return {
      statusCode: StatusCodes.OK,
      message: 'Categoria creada con exito!',
      entity: categoryCreated,
      resultkeys: [RESULT_OK]
    }
  }

  async getAllCategories (): Promise<Category[]> {
    return await categoryRepository.find()
  }

  async update (id: number, categoryData: CategoryUpdateDTO): Promise<IResult> {
    const errors = await validate(categoryData);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Error de validacion al crear una nueva categoria ${errors}.`,
        entity: null,
        resultkeys: errorKeys
      }
    }

    const currentCategory = await categoryRepository.findOneBy({id});

    if (currentCategory === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró una categoria con el ID: ${id}.`,
        entity: null,
        resultkeys: [NOT_FOUND]
      };
    }

    await categoryRepository.update(currentCategory.id, categoryData);
    const updatedCategory = await categoryRepository.findOneBy({id});

    return {
      statusCode: StatusCodes.OK,
      message: 'La categoria ha sido actualizada exitosamente',
      entity: updatedCategory,
      resultkeys: [RESULT_OK]
    }
  }

  async delete(id: number): Promise<IResult> {
    const categoryToDelete = await categoryRepository.findOneBy({id});

    if (categoryToDelete === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró una categoria con el ID: ${id}.`,
        entity: null,
        resultkeys: [NOT_FOUND]
      }
    }

    await categoryRepository.update(id, {deletedAt: new Date()});

    return {
      statusCode: StatusCodes.OK,
      message: `La categoria con ID ${id} fue eliminada con exito.`,
      entity: null,
      resultkeys: [RESULT_OK]
    }
  }

}
