import {OAuth2Object} from "../configs/OAuth2Config";

class AuthService {
    public createRedirectUrl(oAuth2Object: OAuth2Object): string {
        const queryParams = new URLSearchParams({
            client_id: oAuth2Object.clientId, // todo: set clientId correctly
            scope: 'fhict fhict_personal',
            redirect_uri: oAuth2Object.redirectUri, // todo: set redirectUri correctly
            response_type: 'code',
        });

        return `${oAuth2Object.authUrl}?${queryParams.toString()}`;
    }

    public createTokenUrl(code: any, oAuth2Object: OAuth2Object): string {
        const queryParams = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code as string,
            redirect_uri: oAuth2Object.redirectUri,
            client_id: oAuth2Object.clientId,
            client_secret: oAuth2Object.clientSecret,
        });

        return `${oAuth2Object.tokenUrl}?${queryParams.toString()}`;
    }
}

export default AuthService;
