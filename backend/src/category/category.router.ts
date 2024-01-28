import { Router } from "express";

import CategoryController from "./category.controller";
import validarJWT from "../middlewars/validarJWT";

const categoryRouter = Router();
const categoryController = new CategoryController()

categoryRouter.post('/', validarJWT, categoryController.create);
categoryRouter.put('/:id', validarJWT, categoryController.update);
categoryRouter.delete('/:id', validarJWT, categoryController.delete);
categoryRouter.get('/', validarJWT, categoryController.getAllCategories)

export default categoryRouter;