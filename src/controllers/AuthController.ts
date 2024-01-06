import {Request, Response} from 'express';
import UserService from '../services/UserService';
import AuthService from '../services/authentication/AuthService';
import axios from "axios";
import getOAuthObject, {OAuthObject} from "../configs/OAuthConfig";
import FhictOAuthStrategy from "../services/authentication/strategy/FhictOAuthStrategy";

class AuthController {
    private userService: UserService;
    private authService: AuthService;
    private readonly oAuthObject: OAuthObject

    constructor() {
        // todo: make oauth object and strategies injection dynamic when more options become available
        this.userService = new UserService();
        this.authService = new AuthService(new FhictOAuthStrategy());
        this.oAuthObject = getOAuthObject('fhict')
    }

    // public authenticationCallback(req: Request, res: Response): void {
    //     passport.authenticate('fhict', async (err, user) => {
    //
    //     })
    // }

    public initAuthentication = (req: Request, res: Response): void => {
        if (!this.oAuthObject.authUrl || !this.oAuthObject.clientId || !this.oAuthObject.redirectUri) {
            throw new Error('Missing required environment variables.');
        }

        const redirectUrl = this.authService.createRedirectUrl(this.oAuthObject);

        res.redirect(redirectUrl);
    }

    public authenticationCallback = async (req: Request, res: Response): Promise<void> => {
        try {
            const { code } = req.query;

            if (!code) {
                throw new Error('Missing required code retrieved from OAuth2 server.');
            }

            if (!this.oAuthObject.authUrl || !this.oAuthObject.clientId || !this.oAuthObject.redirectUri) {
                throw new Error('Missing required environment variables.');
            }

            const tokenUrl = this.authService.createTokenUrl(code, this.oAuthObject);
            const requestData = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

            const tokenResponse = await axios.post(tokenUrl, requestData);
            const accessToken = tokenResponse.data.access_token;

            const userInfoResponse = await axios.get(this.oAuthObject.userInfoUrl, {
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
