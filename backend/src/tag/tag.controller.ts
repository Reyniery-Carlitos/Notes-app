import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import TagService from "./tag.service";
import { plainToInstance } from "class-transformer";
import { TagCreateDTO, TagUpdateDTO } from "./dtos/tag.dtos";

const tagService = new TagService()

export default class TagController {
  async create (req: Request, res: Response): Promise<void> {
    try{
      const tagData = await plainToInstance(TagCreateDTO, req.body);

      const result = await tagService.create(tagData);

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

  async update (req: Request, res: Response): Promise<void> {
    try{
      const id = Number(req.params.id);
      const tagData = plainToInstance(TagUpdateDTO, req.body);

      const result = await tagService.update(id, tagData);

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

      const result = await tagService.delete(id);

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