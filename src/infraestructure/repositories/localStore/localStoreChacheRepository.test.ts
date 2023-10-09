
import { localStoreCacheRepository } from './localStoreCacheRepository';
import {SystemClock} from "../../time/systemClock";
import {HttpPodcastRepository} from "../http/httpPodcastRepository";
import {HttpClient} from "../http/httpClient";
import { Podcast } from '../../../domain/model/podcast';

describe('localStoreCacheRepository', () => {
    const httpPodcastRepository = new HttpPodcastRepository(new HttpClient());
    const mockSystemClock = SystemClock();
    const cacheRepository = new localStoreCacheRepository(mockSystemClock, httpPodcastRepository);
    const dayNotExpiredInMs = 1696681024;
    const dayInMs = 24 * 60 * 60 * 1000;
    const mockPodcastId = 123;

    const podcastDTO = {
        storedAt: 1696681024,
        podcasts: [{
            id: 1535809341,
            img: 'im:image',
            name: 'im:name',
            author: 'im:artist',
            description: 'description'
        }]
    }

    const podcastDTO2 = {
        storedAt: 1696681024,
        podcasts: {
            id: 1535809341,
            img: 'im:image',
            name: 'im:name',
            author: 'im:artist',
            description: 'description'
        }
    }

    const podcast: Podcast = {
            id: 1535809341,
            img: 'im:image',
            name: 'im:name',
            author: 'im:artist',
            description: 'description'
        }

    it('should save the retrieve podcast from api and return it', async () => {
        jest.spyOn(Storage.prototype, "setItem")
        mockSystemClock.now = jest.fn(() => dayNotExpiredInMs)
        httpPodcastRepository.getPodcast = jest.fn(() => Promise.resolve([podcast]));


        const result = await cacheRepository.get();

        expect(result).toEqual([podcast]);
        expect(localStorage.setItem).toHaveBeenCalledWith('podcast', JSON.stringify(podcastDTO))
    });

    it('should fetch and store podcasts if storage is expired more than one day', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => JSON.stringify(podcastDTO))
        jest.spyOn(Storage.prototype, 'setItem');

        mockSystemClock.now = jest.fn(() => dayNotExpiredInMs + dayInMs)
        const newData = { storedAt: mockSystemClock.now(), podcasts: [podcast] };

        httpPodcastRepository.getPodcast = jest.fn(() => Promise.resolve([podcast]));


        const result = await cacheRepository.get();

        expect(result).toEqual([podcast]);
        expect(localStorage.setItem).toHaveBeenCalledWith('podcast', JSON.stringify(newData))
    });

    it('should retrieve from localstorage', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => JSON.stringify(podcastDTO))

        mockSystemClock.now = jest.fn(() => 1696691824);

        jest.spyOn(httpPodcastRepository, "getPodcast")


        const result = await cacheRepository.get();

        expect(result).toEqual(podcastDTO.podcasts);
        expect(httpPodcastRepository.getPodcast).not.toHaveBeenCalled();
    } )


    it('should save the retrieve detailedPodcast from api and return it', async () => {

        jest.spyOn(Storage.prototype, "setItem")


        mockSystemClock.now = jest.fn(() => dayNotExpiredInMs)
        httpPodcastRepository.getPodcastById = jest.fn(() => Promise.resolve(podcast));


        const result = await cacheRepository.getById(mockPodcastId);

        expect(result).toEqual(podcast);
        expect(localStorage.setItem).toHaveBeenCalledWith('podcastLookup-'+ mockPodcastId, JSON.stringify(podcastDTO))
    });

    it('should fetch and store detailedPodcast if storage is expired more than one day', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => JSON.stringify(podcastDTO))
        jest.spyOn(Storage.prototype, 'setItem');


        mockSystemClock.now = jest.fn(() => dayNotExpiredInMs + dayInMs)
        const newData = { storedAt: mockSystemClock.now(), podcasts: [podcast] };

        httpPodcastRepository.getPodcastById = jest.fn(() => Promise.resolve(podcast));

        const result = await cacheRepository.getById(mockPodcastId);

        expect(result).toEqual(podcast);
        expect(localStorage.setItem).toHaveBeenCalledWith('podcastLookup-' + mockPodcastId, JSON.stringify(newData))
    });

    it('should retrieve detailedPodcast from localstorage', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => JSON.stringify(podcastDTO))
        mockSystemClock.now = jest.fn(() => 1696691824);
        jest.spyOn(httpPodcastRepository, "getPodcast")

        const result = await cacheRepository.getById(mockPodcastId);

        expect(result).toEqual(podcastDTO.podcasts);
        expect(httpPodcastRepository.getPodcast).not.toHaveBeenCalled();
    } )

});