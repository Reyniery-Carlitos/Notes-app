import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";

import {
  IResult,
  RESULT_OK,
  NOT_FOUND,
} from "../utils/interfaces/result.interface";
import { NoteCreateDTO, NoteUpdateDTO } from "./dtos/note.dtos";
import { extractErrorKeysFromErrors } from "../utils/functions";
import { NoteRepository } from "./note.repository";

const noteRepository = new NoteRepository();

export default class NoteService {
  async create(noteData: NoteCreateDTO): Promise<IResult> {
    const errors = await validate(noteData);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Hubo un error de validación al actualizar la nota: ${errors}.`,
        entity: null,
        resultkeys: errorKeys,
      };
    }

    const noteCreated = await noteRepository.save(noteData);

    return {
      statusCode: StatusCodes.OK,
      message: "Nota creada con éxito!.",
      entity: noteCreated,
      resultkeys: [RESULT_OK],
    };
  }

  async update(id: number, noteData: NoteUpdateDTO): Promise<IResult> {
    const errors = await validate(noteData);

    if (errors.length > 0) {
      const errorKeys = extractErrorKeysFromErrors(errors);

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Hubo un error de validación al actualizar la nota: ${errors}.`,
        entity: null,
        resultkeys: errorKeys,
      };
    }

    const currentNote = await noteRepository.findOneBy({ id });

    if (currentNote === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró una nota con el ID: ${id}.`,
        entity: null,
        resultkeys: [NOT_FOUND],
      };
    }

    await noteRepository.update(currentNote.id, noteData);
    const updatedNote = await noteRepository.findOneBy({ id });

    return {
      statusCode: StatusCodes.OK,
      message: "Los datos de la nota han sido actualizados con éxito.",
      entity: updatedNote,
      resultkeys: [RESULT_OK],
    };
  }

  async delete(id: number): Promise<IResult> {
    const noteToDelete = await noteRepository.findOneBy({ id });

    if (noteToDelete === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontró una nota con el ID: ${id}.`,
        entity: null,
        resultkeys: [NOT_FOUND],
      };
    }

    await noteRepository.update(id, { deletedAt: new Date() });

    return {
      statusCode: StatusCodes.OK,
      message: `La nota con ID ${id} fue eliminada con exito.`,
      entity: null,
      resultkeys: [RESULT_OK],
    };
  }

  async getNotes(userId: number): Promise<IResult> {
    const notes = await noteRepository
    .createQueryBuilder('notes')
    .innerJoinAndSelect('notes.user', 'users')
    .innerJoinAndSelect('notes.category', 'categories')
    .leftJoinAndSelect('notes.tags', 'tags')
    .where('notes.userId = :id', { id: userId })
    .select([
        'notes.id',
        'notes.title',
        'notes.description',
        'notes.date',
        'notes.isArchived',
        'notes.isActive',
        'users.id',
        'users.username',
        'users.email',
        'categories.name',
        'categories.id',
        'notes.created_at',
        'notes.updated_at',
        'notes.deleted_at',
        'tags.name',
        'tags.id'
    ])
    .getMany();

    return {
      statusCode: StatusCodes.OK,
      message: `Notas con ID ${userId} de usuario encontrado.`,
      entities: notes,
      resultkeys: [RESULT_OK]
    };
  }

  async getNotesByCategoryId (id: number): Promise<IResult> {
    const notes = await noteRepository
    .createQueryBuilder('notes')
    .innerJoinAndSelect('notes.user', 'users')
    .innerJoinAndSelect('notes.category', 'categories')
    .leftJoinAndSelect('notes.tags', 'tags')
    .where('notes.categoryId = :id', { id: id })
    .select([
        'notes.id',
        'notes.title',
        'notes.description',
        'notes.date',
        'notes.isArchived',
        'notes.isActive',
        'users.id',
        'users.username',
        'users.email',
        'categories.name',
        'categories.id',
        'notes.created_at',
        'notes.updated_at',
        'notes.deleted_at',
        'tags.name',
        'tags.id'
    ])
    .getMany();

    if (notes === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontro ninguna nota con el ID de categoria ${id}.`,
        entity: null,
        resultkeys: [NOT_FOUND]
      }
    }

    return {
      statusCode: StatusCodes.OK,
      message: `Notas con ID ${id} de categoria encontrado.`,
      entities: notes,
      resultkeys: [RESULT_OK]
    };
  } 

  async getNotesByTitle (title: string): Promise<IResult> {
    const notes = await noteRepository
    .createQueryBuilder('notes')
    .innerJoinAndSelect('notes.user', 'users')
    .innerJoinAndSelect('notes.category', 'categories')
    .leftJoinAndSelect('notes.tags', 'tags')
    .where('notes.title = :title', { title: title })
    .select([
        'notes.id',
        'notes.title',
        'notes.description',
        'notes.date',
        'notes.isArchived',
        'notes.isActive',
        'users.id',
        'users.username',
        'users.email',
        'categories.name',
        'categories.id',
        'notes.created_at',
        'notes.updated_at',
        'notes.deleted_at',
        'tags.name',
        'tags.id'
    ])
    .getMany();

    if (notes === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontro ninguna nota con el titulo ${title}.`,
        entity: null,
        resultkeys: [NOT_FOUND]
      }
    }

    return {
      statusCode: StatusCodes.OK,
      message: `Notas con titulo ${title} encontrada.`,
      entities: notes,
      resultkeys: [RESULT_OK]
    };
  } 

  async getNoteById (id: number): Promise<IResult> {
    const note = await noteRepository
    .createQueryBuilder('notes')
    .innerJoinAndSelect('notes.user', 'users')
    .innerJoinAndSelect('notes.category', 'categories')
    .leftJoinAndSelect('notes.tags', 'tags')
    .where('notes.id = :id', { id: id })
    .select([
        'notes.id',
        'notes.title',
        'notes.description',
        'notes.date',
        'notes.isArchived',
        'notes.isActive',
        'users.id',
        'users.username',
        'users.email',
        'categories.name',
        'categories.id',
        'notes.created_at',
        'notes.updated_at',
        'notes.deleted_at',
        'tags.name',
        'tags.id'
    ])
    .getOne();

    if (note === null) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: `No se encontro ninguna nota con el ID ${id}.`,
        entity: null,
        resultkeys: [NOT_FOUND]
      }
    }

    return {
      statusCode: StatusCodes.OK,
      message: `Nota con ID ${id} encontrada.`,
      entity: note,
      resultkeys: [RESULT_OK]
    }
  }
}
