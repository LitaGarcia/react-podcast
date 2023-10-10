import {SystemClock} from "../../infraestructure/time/systemClock";
import {HttpPodcastRepository} from "../../infraestructure/repositories/http/httpPodcastRepository";
import {localStoreCacheRepository} from "../../infraestructure/repositories/localStore/localStoreCacheRepository";
import {GetPodcastsTop} from "./getPodcastsTop";
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
    const httpPodcastRepository = new HttpPodcastRepository(new HttpClient);
    const storeCacheRepository = new localStoreCacheRepository(SystemClock());
    const getPodcastsTop = new GetPodcastsTop(storeCacheRepository, httpPodcastRepository)

    it ('should return a podcasts list when there are entries in cache', async () => {
        storeCacheRepository.get = jest.fn(() => Promise.resolve(podcast));
        const result = await getPodcastsTop.execute()

        expect(result).toEqual(podcast)
    })
    it ('should return a podcasts list when there are no entries in cache or are expired', async () => {
        storeCacheRepository.get = jest.fn(() => Promise.resolve([]));
        httpPodcastRepository.getPodcast = jest.fn( () => Promise.resolve(podcast))
        const result = await getPodcastsTop.execute()

        expect(result).toEqual(podcast);
    })

})