import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { plainToInstance } from "class-transformer";

import CategoryService from "./category.service";
import { CategoryCreateDTO, CategoryUpdateDTO } from "./dtos/category.dtos";

const categoryService = new CategoryService()

export default class CategoryController {
  async create (req: Request, res: Response): Promise<void> {
    try{
      const categoryData = await plainToInstance(CategoryCreateDTO, req.body);

      const result = await categoryService.create(categoryData);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: {result: result.entity},
          resultKeys: result.resultkeys
        })

    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error de servidor: ${err}`)
    }
  }

  async getAllCategories (req: Request, res: Response): Promise<void> {
    try{
      const result = await categoryService.getAllCategories();

      res
        .status(StatusCodes.OK)
        .json({
          data: {result: result},
          count: result.length
        })

    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error de servidor: ${err}`)
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try{
      const id = Number(req.params.id);
      const categoryData = plainToInstance(CategoryUpdateDTO, req.body);

      const result = await categoryService.update(id, categoryData);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: {result: result.entity},
          resultKeys: result.resultkeys
        })

    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error de servidor: ${err}`)
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try{
      const id = Number(req.params.id);

      const result = await categoryService.delete(id);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: {result: result.entity},
          resultKeys: result.resultkeys
        })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error de servidor: ${err}`)
    }
  }
}