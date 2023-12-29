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
}

export default AuthService;
