import {OAuthObject} from "../../configs/OAuthConfig";
import {OAuthStrategy} from "./interface/OAuthStrategy";

class AuthService {
    private oAuthStrategy: OAuthStrategy;

    constructor(oauthStrategy: OAuthStrategy) {
        this.oAuthStrategy = oauthStrategy;
    }

    public createRedirectUrl(oAuthObject: OAuthObject): string {
        return this.oAuthStrategy.createRedirectUrl(oAuthObject);
    }

    public createTokenUrl(code: any, oAuthObject: OAuthObject): string {
        return this.oAuthStrategy.createTokenUrl(code, oAuthObject);
    }
}

export default AuthService;
