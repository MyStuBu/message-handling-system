import AuthService from '../../src/services/AuthService';
import getOAuth2Config from "../../src/configs/OAuth2Config";

const authService: AuthService = new AuthService();

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
        it('should create a correct redirectUrl', () => {
            // arrange
            const config = getOAuth2Config('fhict')

            // act
            const redirectUrl = authService.createRedirectUrl(config);

            // assert
            const mockUrl = 'https://identity.fhict.nl/connect/authorize?client_id=mock_client_id&scope=fhict+fhict_personal&redirect_uri=mock_redirect_uri&response_type=code';
            expect(mockUrl).toEqual(redirectUrl);
        })
    })

});
