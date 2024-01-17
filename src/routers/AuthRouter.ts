import express, { Router } from 'express';
import {PassportStatic} from 'passport';
import GoogleAuthentication from '../middleware/GoogleAuthentication';
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
        // this.router.get('/authenticate', this.authController.initAuthentication);
        // this.router.post('/retrieve-token', this.authController.authenticationCallback);
        // this.router.get('/authenticate', passport.authenticate('fhict'));
        // this.router.post('/callback', passport.authenticate('fhict'), this.authController.authenticationCallback)
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default AuthRouter;
