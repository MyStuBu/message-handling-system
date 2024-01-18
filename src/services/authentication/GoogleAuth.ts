import {PassportStatic} from 'passport';
import {Strategy as GoogleStrategy, VerifyCallback} from 'passport-google-oauth2';
import {Request} from 'express';
import {OAuthConfig} from '../../configs/OAuthConfigInterface';

class GoogleAuth {
    private config: OAuthConfig;

    constructor(config: OAuthConfig, passport: PassportStatic) {
        this.config = config;
        this.setupStrategy(passport);
    }

    private setupStrategy = (passport: PassportStatic) => {
        passport.use(new GoogleStrategy({
            clientID: this.config.clientID,
            clientSecret: this.config.clientSecret,
            callbackURL: this.config.callbackURL,
            passReqToCallback: true,
        },
        function (req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
            // todo: create or find user in database
            return done(null, profile);
        }
        ))

        passport.serializeUser((user: any, done) => {
            return done(null, user);
        });

        passport.deserializeUser((user: any, done) => {
            return done(null, user);
        });
    }
}

export default GoogleAuth