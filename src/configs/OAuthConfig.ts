import process from "process";

export interface OAuthObject {
    authUrl: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    tokenUrl: string;
    userInfoUrl: string;
}

interface OAuthConfig {
    [key: string]:
        OAuthObject
}

const configurations: OAuthConfig = {
    "fhict": {
        "authUrl": process.env.FONTYS_AUTH_URL || '',
        "clientId": process.env.FONTYS_CLIENT_ID || '',
        "clientSecret": process.env.FONTYS_CLIENT_SECRET || '',
        "redirectUri": process.env.FONTYS_REDIRECT_URI || '',
        "tokenUrl": process.env.FONTYS_TOKEN_URL || '',
        "userInfoUrl": process.env.FONTYS_USER_INFO_URL || '',
    }
}

const getOAuthConfig = (key: string): OAuthConfig[string] => {
    if (!(key in configurations)) {
        throw new Error(`Environment "${key}" not found in configurations.`);
    }

    return configurations[key];
}

export default getOAuthConfig;