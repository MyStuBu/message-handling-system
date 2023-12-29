import {Request, Response} from 'express';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import axios from "axios";
import getOAuth2Config, {OAuth2Object} from "../configs/OAuth2Config";

class AuthController {
    private userService: UserService;
    private authService: AuthService;
    private readonly config: OAuth2Object

    constructor() {
        this.userService = new UserService();
        this.authService = new AuthService();
    }

    public authenticate = (req: Request, res: Response): void => {
        const {auth_url, client_id, redirect_uri} = getOAuth2Config('fhict')

        if (!auth_url || !client_id || !redirect_uri) {
            throw new Error('Missing required environment variables.');
        }

        const redirectUrl = this.authService.createRedirectUrl(auth_url, client_id, redirect_uri);

        res.redirect(redirectUrl);
    }

    public authenticateCallback = async (req: Request, res: Response): Promise<void> => {
        try {
            const {code} = req.query;

            const tokenUrl = 'https://identity.fhict.nl/connect/token';
            const tokenResponse = await axios.post(
                tokenUrl,
                new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code as string,
                    redirect_uri: 'https://your-app.com/auth/fhict/callback',
                    client_id: 'yourClientId',
                    client_secret: 'yourClientSecret',
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const accessToken = tokenResponse.data.access_token;

            // find or store user in database

            res.redirect('');
        } catch (error) {
            console.log('Error in handleFHICTAuthorizationCallback:', error);
            throw error;
        }
    }

    // public loginUser = async (req: Request, res: Response): Promise<any> => {
    //     try {
    //         const { username, password } = this.authService.extractUserCredentials(req.body);
    //         const user: User | null = await this.userService.findUserInDatabase(username);
    //
    //         if (!user) {
    //             return res.status(401).json({ error: `User with ${username} not found` });
    //         }
    //
    //         const isValidPassword: boolean = await this.authService.validatePassword(password, user.password);
    //
    //         if (!isValidPassword) {
    //             return res.status(401).json({ error: 'Invalid password' });
    //         }
    //
    //         const token: string = this.authService.signJwtToken(user.id);
    //         res.json({ token });
    //     } catch (error) {
    //         console.error('Error in loginUser:', error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // }
}

export default AuthController;
