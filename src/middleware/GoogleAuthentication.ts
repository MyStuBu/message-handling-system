import {NextFunction, Request, Response} from 'express';
import {PassportStatic} from 'passport';
import process from 'process';

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
            successRedirect: process.env.STUDY_BUDDY_SPA_URL,
            failureRedirect: '/auth/failure'
        })(req, res, next);
    }
}

export default GoogleAuthentication;