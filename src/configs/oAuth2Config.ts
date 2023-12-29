import process from "process";

interface OAuth2Config {
    [key: string]: {
        auth_url: string;
        client_id: string;
        redirect_uri: string;
    }
}

const configurations: OAuth2Config = {
    "fhict": {
        "auth_url": process.env.FONTYS_AUTH_URL || '',
        "client_id": process.env.FONTYS_CLIENT_ID || '',
        "redirect_uri": process.env.FONTYS_REDIRECT_URI || '',
    }
}

const getOAuth2Config = (env: string): OAuth2Config[string] => {
    if (!(env in configurations)) {
        throw new Error(`Environment "${env}" not found in configurations.`);
    }

    return configurations[env];
}

export default getOAuth2Config;