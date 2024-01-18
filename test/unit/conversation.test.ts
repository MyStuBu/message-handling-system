import {getMockReq} from '@jest-mock/express'
import ConversationService from '../../src/services/ConversationService';

const conversationService: ConversationService = new ConversationService();

jest.mock('process', () => ({
    env: {
        API_KEY: 'mock_api_key',
        POD_ID: 'mock_pod_id',
    },
}));

describe('conversationService', () => {
    describe('extractUserMessage', () => {
        it('should extract user message from a request body', () => {
            // Arrange
            const request = getMockReq({
                body: {
                    message: 'This is a test message',
                },
            });

            // Act
            const result = conversationService.extractUserMessage(request.body);

            // Assert
            expect(result).toEqual({
                message: 'This is a test message',
            });
        });

        it('should return an object with undefined for missing credentials', () => {
            // Arrange
            const requestWithoutCredentials = getMockReq({body: {},});

            // Act
            const result = conversationService.extractUserMessage(requestWithoutCredentials.body);

            // Assert
            expect(result).toEqual({
                message: undefined,
            });
        });
    });

    describe('prepareSendMessageToLLM', () => {
        it('should correctly set up a axiosConfig', async () => {
            // Arrange
            const question = 'This is the question'

            // Act
            const result = conversationService.prepareSendMessageToLLM(question);

            // Assert
            expect(result).toEqual({
                method: 'post',
                url: 'https://api.runpod.ai/v2/mock_pod_id/run',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer mock_api_key',
                },
                maxBodyLength: Infinity,
                data: '{"input":{"question":"This is the question"}}'
            }
            );
        });
    });

    describe('prepareConfigReceiveLLM', () => {
        it('should correctly set up a axiosConfig', async () => {
            // Arrange
            const jobId = 'Test'

            // Act
            const result = conversationService.prepareReceiveMessageFromLLM(jobId);

            // Assert
            expect(result).toEqual({
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://api.runpod.ai/v2/mock_pod_id/status/${jobId}`,
                headers: {
                    'Authorization': 'Bearer mock_api_key',
                },
            });
        });
    })
});
