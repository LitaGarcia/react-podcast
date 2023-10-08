import {GetDetailedPodcast} from "./getDetailedPodcast";
import {SystemClock} from "../infraestructure/time/systemClock";
import {HttpPodcastRepository} from "../infraestructure/repositories/http/httpPodcastRepository";
import {localStoreCacheRepository} from "../infraestructure/repositories/localStore/localStoreCacheRepository";
import {HttpClient} from "../infraestructure/repositories/http/httpClient";

describe( 'getPodcastLookup' ,() => {
    const podcastDetails = {
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
            description: 'description'
        }
    ]

    const expectedResult = {
        id: 1535809341,
        img: 'im:image',
        name: 'im:name',
        author: 'im:artist',
        description: 'description',
        episodeNumbers: undefined,
        episodes: [
            {
                id: 123,
                title: 'episode.trackName',
                releaseDate: 'episode.releaseDate',
                trackTime: 'episode.trackTimeMillis',
                description: 'description',
                url: 'url'
            }
        ]
    }

    it ('should return a podcast with episodes', async () => {
        const mockCachePodcastRepository = new localStoreCacheRepository(SystemClock(), new HttpPodcastRepository(new HttpClient()));

        mockCachePodcastRepository.getById = jest.fn(() => Promise.resolve(podcastDetails));
        mockCachePodcastRepository.get = jest.fn(() => Promise.resolve(podcast));
        const getPodcastLookup= new GetDetailedPodcast(mockCachePodcastRepository);

        const result = await getPodcastLookup.execute(1535809341)

        expect(result).toEqual(expectedResult)
    })

})