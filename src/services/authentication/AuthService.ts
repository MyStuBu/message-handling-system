import {OAuth2Object} from "../../configs/OAuth2Config";
import {OAuth2Strategy} from "./interface/OAuth2Strategy";

class AuthService {
    private oAuth2Strategy: OAuth2Strategy;

    constructor(oauth2Strategy: OAuth2Strategy) {
        this.oAuth2Strategy = oauth2Strategy;
    }

    public createRedirectUrl(oAuth2Object: OAuth2Object): string {
        return this.oAuth2Strategy.createRedirectUrl(oAuth2Object);
    }

    public createTokenUrl(code: any, oAuth2Object: OAuth2Object): string {
        return this.oAuth2Strategy.createTokenUrl(code, oAuth2Object);
    }
}

export default AuthService;
