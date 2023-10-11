export class HttpClient {
    fetch = async (url: string): Promise<any> => {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Fetch error:", `HTTP error! Status: ${response.status}`);
        }
        console.log(response)
        return await response.json();
    }
}