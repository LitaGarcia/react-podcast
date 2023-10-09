import {SystemClock} from "../infraestructure/time/systemClock";
import {HttpPodcastRepository} from "../infraestructure/repositories/http/httpPodcastRepository";
import {localStoreCacheRepository} from "../infraestructure/repositories/localStore/localStoreCacheRepository";
import {HttpClient} from "../infraestructure/repositories/http/httpClient";
import {GetDetailedEpisode} from "./getDetailedEpisode";

describe( 'getDetailedEpisode' ,() => {
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
                url: 'episodeUrl'
            }
        ]
    }

    it ('should return a podcast with detailed episodes', async () => {
        const mockCachePodcastRepository = new localStoreCacheRepository(SystemClock(), new HttpPodcastRepository(new HttpClient()));

        mockCachePodcastRepository.get = jest.fn(() => Promise.resolve(podcast));
        mockCachePodcastRepository.getById = jest.fn(() => Promise.resolve(podcastDetails));

        const getDetailedPodcast= new GetDetailedEpisode(mockCachePodcastRepository);

        const result = await getDetailedPodcast.execute(1535809341, 123)

        expect(result).toEqual(expectedResult)
    })

})