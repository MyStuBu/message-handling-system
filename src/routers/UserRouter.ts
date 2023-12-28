import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middleware/AuthMiddleware';

class UserRouter {
    private readonly router: Router;
    private userController: UserController;
    private authMiddleware: AuthMiddleware;

    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.authMiddleware = new AuthMiddleware();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/', this.userController.getAllUsers);
        this.router.get('/:id', this.authMiddleware.middleware, this.userController.getUserById);
        this.router.put('/:id', this.authMiddleware.middleware, this.userController.updateUserById);
        this.router.delete('/:id', this.authMiddleware.middleware, this.userController.deleteUserById);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default UserRouter;
