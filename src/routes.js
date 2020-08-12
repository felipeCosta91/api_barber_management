import { Router } from 'express';
import UserController from './App/controllers/UserController';
import SessionController from './App/controllers/SessionController';
import middlewareAuth from './App/middleware/auth';

const routes = new Router();
routes.post('/session', SessionController.storage);
routes.use(middlewareAuth);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

export default routes;
