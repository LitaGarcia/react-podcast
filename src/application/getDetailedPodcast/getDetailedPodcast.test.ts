import {GetDetailedPodcast} from "./getDetailedPodcast";
import {SystemClock} from "../../infraestructure/time/systemClock";
import {HttpPodcastRepository} from "../../infraestructure/repositories/http/httpPodcastRepository";
import {localStoreCacheRepository} from "../../infraestructure/repositories/localStore/localStoreCacheRepository";
import {HttpClient} from "../../infraestructure/repositories/http/httpClient";

describe( 'getPodcastLookup' ,() => {
    const detailedPodcast = {
        id: 1535809341,
        img: 'im:image',
        name: 'im:name',
        author: 'im:artist',
        episodeNumbers: 2,
        episodes: [{
            id: 123,
            title: 'episode.trackName',
            releaseDate: 'episode.releaseDate',
            trackTime: 'episode.trackTimeMillis',
            url: 'episodeUrl',
            description: 'description'
        }]
    }
    const podcast = [
        {
            id: 1535809341,
            img: 'im:image',
            name: 'im:name',
            author: 'im:artist',
            episodeNumbers: 2,
            description: 'description'
        }
    ]

    const expectedResult = {
        id: 1535809341,
        img: 'im:image',
        name: 'im:name',
        author: 'im:artist',
        description: 'description',
        episodeNumbers: 2,
        episodes: [
            {
                id: 123,
                title: 'episode.trackName',
                releaseDate: 'episode.releaseDate',
                trackTime: 'episode.trackTimeMillis',
                description: 'description',
                url: 'episodeUrl'
            }
        ]
    }


    const httpPodcastRepository = new HttpPodcastRepository(new HttpClient);
    const storeCacheRepository = new localStoreCacheRepository(SystemClock());
    const getDetailedPodcast= new GetDetailedPodcast(storeCacheRepository, httpPodcastRepository);

    it ('should return a detailedPodcast when there are entries in cache', async () => {
        storeCacheRepository.get = jest.fn(() => Promise.resolve(podcast));
        storeCacheRepository.getById = jest.fn(() => Promise.resolve(detailedPodcast));
        const result = await getDetailedPodcast.execute(1535809341)

        expect(result).toEqual(expectedResult)
    })
    it ('should return a detailedPodcast when there are no entries in cache or are expired', async () => {
        storeCacheRepository.getById = jest.fn(() => Promise.resolve(null));
        storeCacheRepository.get = jest.fn(() => Promise.resolve([]));
        httpPodcastRepository.getPodcast = jest.fn(() => Promise.resolve(podcast));
        httpPodcastRepository.getPodcastById = jest.fn(() => Promise.resolve(detailedPodcast));

        const result = await getDetailedPodcast.execute(1535809341)

        expect(result).toEqual(expectedResult)
    })
})