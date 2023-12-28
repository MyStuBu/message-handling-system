import axios, { AxiosRequestConfig } from 'axios';
import * as process from 'process';

class ConversationService {
    public extractUserMessage(body: any): { message: string } {
        return { message: body.message };
    }

    public prepareSendMessageToLLM(question: string): AxiosRequestConfig {
        const podId = process.env.POD_ID;
        const apiKey = process.env.API_KEY;
        const url = `https://api.runpod.ai/v2/${podId}/run`;
        const auth = `Bearer ${apiKey}`;
        const data = JSON.stringify({ input: { question: question } });

        return {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
            },
            data: data,
        };
    }

    public async sendMessageToLLM(axiosConfig: AxiosRequestConfig): Promise<string> {
        try {
            const response = await axios.request(axiosConfig);
            return response.data.id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public prepareReceiveMessageFromLLM(jobId: string): AxiosRequestConfig {
        const podId = process.env.POD_ID;
        const apiKey = process.env.API_KEY;
        const url = `https://api.runpod.ai/v2/${podId}/status/${jobId}`;
        const auth = `Bearer ${apiKey}`;

        return {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Authorization': auth,
            },
        };
    }

    public async receiveMessageFromLLM(axiosConfig: AxiosRequestConfig): Promise<string | undefined> {
        try {
            let response;
            let count = 0;
            do {
                response = await axios.request(axiosConfig);

                if (response.data.status !== 'COMPLETED') {
                    await new Promise(resolve => setTimeout(resolve, 10000));
                    console.log(`Attempts to retrieve message from LLM: ${count++}`);
                }
            } while (response.data.status !== 'COMPLETED');

            return response.data.output?.answer;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ConversationService;
