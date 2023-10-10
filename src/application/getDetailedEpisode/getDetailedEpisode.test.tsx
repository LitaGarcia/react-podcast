import {SystemClock} from "../../infraestructure/time/systemClock";
import {HttpPodcastRepository} from "../../infraestructure/repositories/http/httpPodcastRepository";
import {localStoreCacheRepository} from "../../infraestructure/repositories/localStore/localStoreCacheRepository";
import {HttpClient} from "../../infraestructure/repositories/http/httpClient";
import {GetDetailedEpisode} from "./getDetailedEpisode";

describe( 'getDetailedEpisode' ,() => {
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

    const httpPodcastRepository = new HttpPodcastRepository(new HttpClient);
    const storeCacheRepository = new localStoreCacheRepository(SystemClock());
    const getDetailedEpisodee= new GetDetailedEpisode(storeCacheRepository, httpPodcastRepository);

    it ('should return a podcast with detailed episodes when there are entries in cache', async () => {
        storeCacheRepository.get = jest.fn(() => Promise.resolve(podcast));
        storeCacheRepository.getById = jest.fn(() => Promise.resolve(detailedPodcast));

        const result = await getDetailedEpisodee.execute(1535809341, 123)

        expect(result.episodes?.length).toEqual(1);
        expect(result).toEqual(expectedResult)
    })

    it ('should return a detailedPodcast with episodes when there are no entries in cache or are expired', async () => {
        storeCacheRepository.getById = jest.fn(() => Promise.resolve(null));
        storeCacheRepository.get = jest.fn(() => Promise.resolve([]));
        httpPodcastRepository.getPodcast = jest.fn(() => Promise.resolve(podcast));
        httpPodcastRepository.getPodcastById = jest.fn(() => Promise.resolve(detailedPodcast));

        const result = await getDetailedEpisodee.execute(1535809341, 123)

        expect(result).toEqual(expectedResult)
    })

})