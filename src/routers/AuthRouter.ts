import express, { Router } from 'express';
import {PassportStatic} from 'passport';
import GoogleAuthentication from '../middleware/GoogleAuthentication';

class AuthRouter {
    private readonly router: Router;
    private googleAuthentication: GoogleAuthentication

    constructor(passport: PassportStatic) {
        this.router = express.Router();
        this.googleAuthentication = new GoogleAuthentication(passport);
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/google', this.googleAuthentication.authenticateGoogle);
        this.router.get('/google/callback', this.googleAuthentication.googleCallback);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default AuthRouter;
