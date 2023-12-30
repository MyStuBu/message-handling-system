import express, { Router } from 'express';
import AuthController from '../controllers/AuthController';

class AuthRouter {
    private readonly router: Router;
    private authController: AuthController;

    constructor() {
        this.router = express.Router();
        this.authController = new AuthController();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/authenticate', this.authController.initAuthentication);
        this.router.post('/retrieve-token', this.authController.retrieveAuthenticationToken);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default AuthRouter;
