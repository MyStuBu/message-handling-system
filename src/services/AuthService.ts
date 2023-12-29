import {OAuth2Object} from "../configs/OAuth2Config";

class AuthService {
    public createRedirectUrl(config: OAuth2Object): string {
        const queryParams = new URLSearchParams({
            client_id: config.clientId, // todo: set clientId correctly
            scope: 'fhict fhict_personal',
            redirect_uri: config.redirectUri, // todo: set redirect_uri correctly
            response_type: 'code',
        });

        return `${config.authUrl}?${queryParams.toString()}`;
    }

    public createTokenUrl(code: any, config: OAuth2Object): string {
        const queryParams = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code as string,
            redirect_uri: config.redirectUri,
            client_id: config.clientId,
            client_secret: config.clientSecret,
        });

        return `${config.tokenUrl}?${queryParams.toString()}`;
    }
}

export default AuthService;
