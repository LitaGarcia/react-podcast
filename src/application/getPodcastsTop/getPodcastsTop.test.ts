import {SystemClock} from "../../infraestructure/time/systemClock";
import {HttpPodcastRepository} from "../../infraestructure/repositories/http/httpPodcastRepository";
import {localStoreCacheRepository} from "../../infraestructure/repositories/localStore/localStoreCacheRepository";
import {GetPodcastsTop} from "../getPodcastsTop";
import {HttpClient} from "../../infraestructure/repositories/http/httpClient";

describe( 'getPodcastsTop' ,() => {
    const podcast = [
        {
            id: 1535809341,
            img: 'im:image',
            name: 'im:name',
            author: 'im:artist',
            description: 'description'
        }
    ]

    it ('should return a podcast', async () => {

        const mockCachePodcastRepository = new localStoreCacheRepository(SystemClock(), new HttpPodcastRepository(new HttpClient()));
        mockCachePodcastRepository.get = jest.fn(() => Promise.resolve(podcast));
        const getPodcastsTop = new GetPodcastsTop(mockCachePodcastRepository)

        const result = await getPodcastsTop.execute()

        expect(result).toEqual(podcast)
    })

})