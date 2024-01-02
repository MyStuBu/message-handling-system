import {OAuth2Object} from "../../../configs/OAuth2Config";

export interface OAuth2Strategy {
    createRedirectUrl(oAuth2Object: OAuth2Object): string;
    createTokenUrl(code: any, oAuth2Object: OAuth2Object): string;
}