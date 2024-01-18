import process from 'process';

export interface FhictConfig {
    authUrl: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    tokenUrl: string;
    userInfoUrl: string;
}

export const FHCITConfig = {
    'authUrl': process.env.FONTYS_AUTH_URL || '',
    'clientId': process.env.FONTYS_CLIENT_ID || '',
    'clientSecret': process.env.FONTYS_CLIENT_SECRET || '',
    'redirectUri': process.env.FONTYS_REDIRECT_URI || '',
    'tokenUrl': process.env.FONTYS_TOKEN_URL || '',
    'userInfoUrl': process.env.FONTYS_USER_INFO_URL || '',
}