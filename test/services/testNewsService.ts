// const NewsService = require('../../src/services/newsService.ts');
// import { NewsService } from '../services/newsService';
import NewsService from "../../src/services/newsService";


const newsService = new NewsService();

async function testFetchNews() {
    try {
        console.log('Starting news fetch test...');
        const newsData = await newsService.fetchNews();
        console.log('News data:', newsData);
        console.log('News fetch test completed.');
    // } catch (error: any) {
    //     console.error('Error during news fetch test:', error.message);
    // }
    // } catch (error: any) {
    //     console.error('Error during news fetch test:', (error as Error).message);
    //     throw new Error(`Error fetching API: ${error.message}`);
    // }
    } catch (error: any) {
        console.error('Full Axios Error:', error);
        throw new Error(`Error fetching API: ${error.message}`);
    }


}

testFetchNews();
