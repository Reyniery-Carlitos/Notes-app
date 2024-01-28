import { Router } from "express";

import NoteController from "./note.controller";
import validarJWT from "../middlewars/validarJWT";

const noteRouter = Router();
const noteController = new NoteController();

noteRouter.post('/', noteController.create);
noteRouter.get('/user/:id', validarJWT, noteController.getNotes) // id usuario
noteRouter.get('/category/:id', validarJWT, noteController.getNotesByCategoryId) // id usuario
noteRouter.get('/:id', validarJWT, noteController.getNoteById)
noteRouter.get('/', validarJWT, noteController.getNotesByTitle)
noteRouter.put('/:id', validarJWT, noteController.update);
noteRouter.delete('/:id', validarJWT, noteController.delete);

export default noteRouter;