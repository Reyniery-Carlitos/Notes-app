import {type Request, type Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { plainToInstance } from 'class-transformer';

import NoteService from './note.service';
import { NoteCreateDTO, NoteUpdateDTO } from './dtos/note.dtos';

const noteService = new NoteService();

export default class NoteController {
  async create (req: Request, res: Response): Promise<void> {
    try {
      const noteData = plainToInstance(NoteCreateDTO, req.body);

      const result = await noteService.create(noteData);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: { result: result.entity },
          resultKeys: result.resultkeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async getNotesByTitle (req: Request, res: Response): Promise<void> {
    try {
      const title = req.query.title as string

      const result = await noteService.getNotesByTitle(title);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: { result: result.entities },
          resultKeys: result.resultkeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async getNotes (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const result = await noteService.getNotes(id);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: { result: result.entities },
          resultKeys: result.resultkeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async getNotesByCategoryId (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const result = await noteService.getNotesByCategoryId(id);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: { result: result.entities },
          resultKeys: result.resultkeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async getNoteById (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const result = await noteService.getNoteById(id);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: { result: result.entity },
          resultKeys: result.resultkeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const noteData = plainToInstance(NoteUpdateDTO, req.body);

      const result = await noteService.update(id, noteData);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: { result: result.entity },
          resultKeys: result.resultkeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const result = await noteService.delete(id);

      res
        .status(result.statusCode)
        .json({
          message: result.message,
          data: { result: result.entity },
          resultKeys: result.resultkeys
        });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }
}