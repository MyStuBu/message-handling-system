import {OAuthObject} from "../../../configs/OAuthConfig";
import {OAuthStrategy} from "../interface/OAuthStrategy";

class FhictOAuthStrategy implements OAuthStrategy {
    public createRedirectUrl(oAuth2Object: OAuthObject): string {
        const queryParams = new URLSearchParams({
            client_id: oAuth2Object.clientId, // todo: set clientId correctly
            scope: 'fhict fhict_personal',
            redirect_uri: oAuth2Object.redirectUri, // todo: set redirectUri correctly
            response_type: 'code',
        });

        return `${oAuth2Object.authUrl}?${queryParams.toString()}`;
    }

    public createTokenUrl(code: any, oAuth2Object: OAuthObject): string {
        const queryParams = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code as string,
            redirect_uri: oAuth2Object.redirectUri, // todo: set redirectUri correctly
            client_id: oAuth2Object.clientId, // todo: set clientId correctly
            client_secret: oAuth2Object.clientSecret, // todo: set clientSecret correctly
        });

        return `${oAuth2Object.tokenUrl}?${queryParams.toString()}`;
    }
}

export default FhictOAuthStrategy;