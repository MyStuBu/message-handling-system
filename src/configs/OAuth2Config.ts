import process from "process";

export interface OAuth2Object {
    authUrl: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    tokenUrl: string;
    userInfoUrl: string;
}

interface OAuth2Config {
    [key: string]:
        OAuth2Object
}

const configurations: OAuth2Config = {
    "fhict": {
        "authUrl": process.env.FONTYS_AUTH_URL || '',
        "clientId": process.env.FONTYS_CLIENT_ID || '',
        "clientSecret": process.env.FONTYS_CLIENT_SECRET || '',
        "redirectUri": process.env.FONTYS_REDIRECT_URI || '',
        "tokenUrl": process.env.FONTYS_TOKEN_URL || '',
        "userInfoUrl": process.env.FONTYS_USER_INFO_URL || '',
    }
}

const getOAuth2Config = (key: string): OAuth2Config[string] => {
    if (!(key in configurations)) {
        throw new Error(`Environment "${key}" not found in configurations.`);
    }

    return configurations[key];
}

export default getOAuth2Config;