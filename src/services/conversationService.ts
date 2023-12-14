import axios, {AxiosRequestConfig} from 'axios';
import * as process from 'process';

const extractUserMessage = (body: any): { message: string } => {
    return {message: body.message}
};

const prepareSendMessageToLLM = (question: string): AxiosRequestConfig => {
    const podId = process.env.POD_ID;
    const apiKey = process.env.API_KEY;
    const url = `https://api.runpod.ai/v2/${podId}/run`
    const auth = `Bearer ${apiKey}`
    let data = JSON.stringify({"input": {"question": question}});

    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        data: data,
    }
};

const sendMessageToLLM = async (axiosConfig: AxiosRequestConfig): Promise<string> => {
    try {
        const response = await axios.request(axiosConfig);
        return response.data.id;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const prepareReceiveMessageFromLLM = (jobId: string): AxiosRequestConfig => {
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
    }
};

const receiveMessageFromLLM = async (axiosConfig: AxiosRequestConfig): Promise<string | undefined> => {
    try {
        let response;
        let count = 0;
        do {
            response = await axios.request(axiosConfig);

            if (response.data.status !== "COMPLETED") {
                await new Promise(resolve => setTimeout(resolve, 10000));
                console.log(`Attempts to retrieve message from LLM: ${count++}`);
            }
        } while (response.data.status !== "COMPLETED");

        return response.data.output?.answer;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    extractUserMessage,
    prepareSendMessageToLLM,
    sendMessageToLLM,
    prepareReceiveMessageFromLLM,
    receiveMessageFromLLM,
};
