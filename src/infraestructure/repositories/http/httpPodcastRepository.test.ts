import {HttpPodcastRepository} from "./httpPodcastRepository";
import {PodcastsResponse} from "./podcastsResponse";
import {HttpClient} from "./httpClient";

describe('httpPodcastRepository',
    () => {
        const expectedPodcast = [{
            id: 123,
            img: 'img',
            name: 'name',
            author: 'author',
            description: 'desc'
        }];

        const expectedDetailedPodcast = {
            id: 123,
            img: 'artwork',
            name: 'trackName',
            author: 'artistName',
            episodeNumbers: 1,
            episodes: [
            {
                id: 123,
                title: 'name',
                releaseDate: '01/01/1212',
                trackTime: '00:12'
            }
        ]
        }

        const podcastResponse: PodcastsResponse = {
            "feed": {
                "entry": [
                    {
                        "im:name": {
                            "label": "name"
                        },
                        "im:image": [
                            {
                                "label": "img_url_1"
                            },
                            {
                                "label": "img_url_2"
                            },
                            {
                                "label": "img"
                            }
                        ],
                        "summary": {
                            "label": "desc"
                        },
                        "id": {
                            "label": "1",
                            "attributes": {
                                "im:id": "123"
                            }
                        },
                        "im:artist": {
                            "label": "author"
                        }
                    }
                ]
            }
        }

        const expectedDetailedPodcastResponse = {
            "resultCount": 1,
            "results": [
                {
                    "releaseDate": "2023-10-01",
                    "trackCount": 1,
                    "artistName": "artistName",
                    "trackName": "trackName",
                    "artworkUrl60": "artwork"
                },
                {
                    "trackId": 123,
                    "trackName": "name",
                    "releaseDate": "1212",
                    "trackTimeMillis": "12121"
                }
            ]
        }


        const mockHttpClient = new HttpClient();
        const httpPodcastRepository = new HttpPodcastRepository(mockHttpClient);

        it('should return a podcasts list', async () => {
            mockHttpClient.fetch = jest.fn(() => Promise.resolve(podcastResponse))

            const result = await httpPodcastRepository.getPodcast();

            expect(result).toEqual(expectedPodcast);
        });

        it('should return a detailed podcast by id', async () => {
            mockHttpClient.fetch = jest.fn(() => Promise.resolve(expectedDetailedPodcastResponse))
            const result = await httpPodcastRepository.getPodcastById(123);

            expect(result).toEqual(expectedDetailedPodcast);
        });

    });