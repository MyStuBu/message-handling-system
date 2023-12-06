import {Request, Response} from "express";
import conversationService from "../services/conversationService";

const llmCommunication = async (req: Request, res: Response): Promise<any> => {
        try {
            const {message} = conversationService.extractUserMessage(req.body);

            if (message === undefined) {
                res.status(400).json({
                    error: 'Invalid request. Message is undefined.',
                });
            }

            const sendMessageConfig = conversationService.prepareSendMessageToLLM(message);
            const jobId = await conversationService.sendMessageToLLM(sendMessageConfig);

            const receiveMessageConfig = conversationService.prepareReceiveMessageFromLLM(jobId);
            const response = conversationService.receiveMessageFromLLM(receiveMessageConfig);

            console.log(response);

            res.status(200).json({
                message: response,
            });

        } catch
            (error) {
            console.error('Error in llm function:', error);
            res.status(500).json({
                error: 'Internal server error.',
            });
        }
    }
;


export default {
    llmCommunication
};