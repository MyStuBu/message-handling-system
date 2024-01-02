import AuthService from '../../src/services/authentication/AuthService';
import getOAuth2Config from "../../src/configs/OAuth2Config";
import {getMockReq} from '@jest-mock/express'
import * as querystring from "querystring";
import FhictOAuth2Strategy from "../../src/services/authentication/strategy/FhictOAuth2Strategy";


const authService: AuthService = new AuthService(new FhictOAuth2Strategy());

jest.mock('process', () => ({
    env: {
        FONTYS_CLIENT_ID: 'mock_client_id',
        FONTYS_CLIENT_SECRET: 'mock_client_id',
        FONTYS_REDIRECT_URI: 'mock_redirect_uri',
        FONTYS_AUTH_URL: 'https://identity.fhict.nl/connect/authorize',
        FONTYS_TOKEN_URL: 'https://identity.fhict.nl/connect/token'
    },
}));

describe('AuthService', () => {
    describe('createRedirectUrl', () => {
        it('should create a correct fhict redirect url', () => {
            // arrange
            const oAuth2Object = getOAuth2Config('fhict')

            // act
            const redirectUrl = authService.createRedirectUrl(oAuth2Object);

            // assert
            const mockUrl = 'https://identity.fhict.nl/connect/authorize?client_id=mock_client_id&scope=fhict+fhict_personal&redirect_uri=mock_redirect_uri&response_type=code';
            expect(mockUrl).toEqual(redirectUrl);
        });
    });

    describe('createTokenUrl', () => {
        it('should create a correct fhict token url', () => {
            // arrange
            const request = getMockReq({query: querystring.parse('mock_code')})
            const {code} = request.query
            const oAuth2Object = getOAuth2Config('fhict')

            // act
            const tokenUrl = authService.createTokenUrl(code, oAuth2Object)

            // assert
            const mockUrl = "https://identity.fhict.nl/connect/token?grant_type=authorization_code&code=undefined&redirect_uri=mock_redirect_uri&client_id=mock_client_id&client_secret=mock_client_id"
            expect(mockUrl).toEqual(tokenUrl);
        });
    });

});
