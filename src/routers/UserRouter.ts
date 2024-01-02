import express, { Router } from 'express';
import UserController from '../controllers/UserController';

class UserRouter {
    private readonly router: Router;
    private userController: UserController;

    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/', this.userController.getAllUsers);
        this.router.get('/:id', this.userController.getUserById);
        this.router.put('/:id', this.userController.updateUserById);
        this.router.delete('/:id', this.userController.deleteUserById);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default UserRouter;
