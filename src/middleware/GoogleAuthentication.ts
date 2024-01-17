import {NextFunction, Request, Response} from 'express';
import {PassportStatic} from 'passport';

class GoogleAuthentication {
    private passport: PassportStatic;
    constructor(passport: PassportStatic) {
        this.passport = passport;
    }

    authenticateGoogle = (req: Request, res: Response, next: NextFunction) => {
        this.passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
    }

    googleCallback = (req: Request, res: Response, next: NextFunction) => {
        this.passport.authenticate('google', {
            failureRedirect: '/auth/failure'
        })(req, res, next);
    }
}

export default GoogleAuthentication;