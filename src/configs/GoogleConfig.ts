import process from 'process';
import {OAuthConfig} from './OAuthConfigInterface';

export const googleConfig: OAuthConfig  = {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '',
}

