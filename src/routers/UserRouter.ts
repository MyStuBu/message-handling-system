import express from "express";

const UserRouter = express.Router();
import UserController from '../controllers/UserController'

// Routes
UserRouter.get('/', UserController.getAllUsers);
UserRouter.get('/:id', UserController.getUserById);
UserRouter.post('/', UserController.createUser);
UserRouter.put('/:id', UserController.updateUserById);
UserRouter.delete('/:id', UserController.deleteUserById);

export default UserRouter;
