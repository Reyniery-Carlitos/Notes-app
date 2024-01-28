import { Router } from 'express';

import { LoginController } from './login.controller';

const loginRouter = Router();
const loginController = new LoginController()

loginRouter.post('/', loginController.login)

export default loginRouter;