import {OAuthObject} from "../../../configs/OAuthConfig";

export interface OAuthStrategy {
    createRedirectUrl(oAuth2Object: OAuthObject): string;
    createTokenUrl(code: any, oAuth2Object: OAuthObject): string;
}