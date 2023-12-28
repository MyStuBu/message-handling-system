import { getMockReq } from '@jest-mock/express';
import AuthService from '../../src/services/AuthService';

const authService: AuthService = new AuthService();

describe('AuthService', () => {
    describe('extractUserCredentials', () => {
        it('should extract user credentials from a valid request', () => {
            // Arrange
            const validRequest = getMockReq({
                body: {
                    username: 'testUser',
                    password: 'testPassword',
                },
            });

            // Act
            const result = authService.extractUserCredentials(validRequest.body);

            // Assert
            expect(result).toEqual({
                username: 'testUser',
                password: 'testPassword',
            });
        });

        it('should return an object with undefined for missing credentials', () => {
            // Arrange
            const requestWithoutCredentials = getMockReq({ body: {} });

            // Act
            const result = authService.extractUserCredentials(requestWithoutCredentials.body);

            // Assert
            expect(result).toEqual({
                username: undefined,
                password: undefined,
            });
        });
    });

    describe('hashUserPassword', () => {
        it('should hash a password correctly', async () => {
            // Arrange
            const mockPassword = 'mockedPassword';

            // Act
            const result = await authService.hashUserPassword(mockPassword);

            // Assert
            expect(result).not.toBe(mockPassword);
        });
    });

    describe('validatePassword', () => {
        it('should validate a correct password', async () => {
            // Arrange
            const mockPassword = 'testPassword';
            const mockStoredHashedPassword = await authService.hashUserPassword(mockPassword);

            // Act
            const result = await authService.validatePassword(mockPassword, mockStoredHashedPassword);

            // Assert
            expect(result).toBe(true);
        });

        it('should not validate an incorrect password', async () => {
            // Arrange
            const mockPassword = 'testPassword';
            const mockStoredHashedPassword = 'incorrectMockedHashedPassword';

            // Act
            const result = await authService.validatePassword(mockPassword, mockStoredHashedPassword);

            // Assert
            expect(result).toBe(false);
        });
    });
});
