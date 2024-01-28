import { Router } from "express";

import TagController from "./tag.controller";
import validarJWT from "../middlewars/validarJWT";

const tagRouter = Router()
const tagController = new TagController()

tagRouter.post('/', validarJWT, tagController.create)
tagRouter.put('/:id', validarJWT, tagController.update)
tagRouter.delete('/:id', validarJWT, tagController.delete)

export default tagRouter;