import { Request, Response } from 'express';
import ConversationService from '../services/ConversationService';

class ConversationController {
    private conversationService: ConversationService;

    constructor() {
        this.conversationService = new ConversationService();
    }

    public llmCommunication = async (req: Request, res: Response): Promise<any> => {
        try {
            const { message } = this.conversationService.extractUserMessage(req.body);

            if (message === undefined) {
                res.status(400).json({
                    error: 'Invalid request. Message is undefined.',
                });
                return;
            }

            const sendMessageConfig = this.conversationService.prepareSendMessageToLLM(message);
            const jobId = await this.conversationService.sendMessageToLLM(sendMessageConfig);

            const receiveMessageConfig = this.conversationService.prepareReceiveMessageFromLLM(jobId);
            const llmResponse = await this.conversationService.receiveMessageFromLLM(receiveMessageConfig);

            res.status(200).json({
                message: llmResponse,
            });
        } catch (error) {
            console.error('Error in llm function:', error);
            res.status(500).json({
                error: 'Internal server error.',
            });
        }
    };
}

export default ConversationController;
