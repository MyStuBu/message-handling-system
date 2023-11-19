import express from "express";

const UserRouter = express.Router();
import UserController from '../controllers/UserController'
import authMiddleware from "../middleware/AuthMiddleware";

// Routes
UserRouter.get('/', UserController.getAllUsers);
UserRouter.get('/:id', authMiddleware, UserController.getUserById);
UserRouter.put('/:id', UserController.updateUserById);
UserRouter.delete('/:id', UserController.deleteUserById);

export default UserRouter;
