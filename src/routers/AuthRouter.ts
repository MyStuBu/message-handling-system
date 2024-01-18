import express, { Router } from 'express';
import {PassportStatic} from 'passport';
import GoogleAuthentication from '../middleware/GoogleAuthentication';
import AuthController from '../controllers/AuthController';

class AuthRouter {
    private readonly router: Router;
    private googleAuthentication: GoogleAuthentication
    private authController: AuthController

    constructor(passport: PassportStatic) {
        this.router = express.Router();
        this.googleAuthentication = new GoogleAuthentication(passport);
        this.authController = new AuthController()
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/google', this.googleAuthentication.authenticateGoogle);
        this.router.get('/google/callback', this.googleAuthentication.googleCallback, this.authController.authenticationSuccessful);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default AuthRouter;
