export class HttpClient {
    fetch = async (url: string): Promise<any> => {
        const response = await fetch(url);
        return await response.json();
    }
}