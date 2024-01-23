import { Router } from "express";
import UserController from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/auth/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.get('/users', userController.getAllUsers);
userRoutes.get('/:id', userController.getUser);

export default userRoutes;