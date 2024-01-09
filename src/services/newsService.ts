import axios from 'axios';


class NewsService {
    private apiUrl: string;
    private headers: { Authorization: string };

    constructor() {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImFVbks3UGtpQWRLRDNNUzViLWZuUEFvNEh0YyIsImtpZCI6ImFVbks3UGtpQWRLRDNNUzViLWZuUEFvNEh0YyJ9'
        this.apiUrl = 'https://api.fhict.nl/newsfeeds';
        this.headers = {
            Authorization: `Bearer ${token}`
        }
    }

    async fetchNews() {
        try {
            console.log('Fetching news...');
            const response = await axios.get(this.apiUrl, { headers: this.headers });
            console.log('News fetched successfully!');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching API:', error.message);
            throw new Error(`Error fetching API: ${error.message}`);
        }
    }
}

module.exports = NewsService;

export default NewsService;

