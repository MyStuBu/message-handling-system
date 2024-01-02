import {Request, Response} from 'express';
import UserService from '../services/UserService';
import AuthService from '../services/authentication/AuthService';
import axios from "axios";
import getOAuth2Object, {OAuth2Object} from "../configs/OAuth2Config";
import FhictOAuth2Strategy from "../services/authentication/strategy/FhictOAuth2Strategy";

class AuthController {
    private userService: UserService;
    private authService: AuthService;
    private readonly oAuth2Object: OAuth2Object

    constructor() {
        // todo: make oauth2 object and strategies injection dynamic when more options become available
        this.userService = new UserService();
        this.authService = new AuthService(new FhictOAuth2Strategy());
        this.oAuth2Object = getOAuth2Object('fhict')
    }

    // public authenticationCallback(req: Request, res: Response): void {
    //     passport.authenticate('fhict', async (err, user) => {
    //
    //     })
    // }

    public initAuthentication = (req: Request, res: Response): void => {
        if (!this.oAuth2Object.authUrl || !this.oAuth2Object.clientId || !this.oAuth2Object.redirectUri) {
            throw new Error('Missing required environment variables.');
        }

        const redirectUrl = this.authService.createRedirectUrl(this.oAuth2Object);

        res.redirect(redirectUrl);
    }

    public authenticationCallback = async (req: Request, res: Response): Promise<void> => {
        try {
            const { code } = req.query;

            if (!code) {
                throw new Error('Missing required code retrieved from OAuth2 server.');
            }

            if (!this.oAuth2Object.authUrl || !this.oAuth2Object.clientId || !this.oAuth2Object.redirectUri) {
                throw new Error('Missing required environment variables.');
            }

            const tokenUrl = this.authService.createTokenUrl(code, this.oAuth2Object);
            const requestData = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

            const tokenResponse = await axios.post(tokenUrl, requestData);
            const accessToken = tokenResponse.data.access_token;

            const userInfoResponse = await axios.get(this.oAuth2Object.userInfoUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // User userInfo its sub value to find or store user in the database (TODO: Implement this logic)


            res.redirect(''); // Add the correct URL for redirection

        } catch (error) {
            console.log('Error in authenticationToken:', error);
            throw error;
        }
    };
}

export default AuthController;
