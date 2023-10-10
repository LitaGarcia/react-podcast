
import { localStoreCacheRepository } from './localStoreCacheRepository';
import {SystemClock} from "../../time/systemClock";
import { Podcast } from '../../../domain/model/podcast';

describe('localStoreCacheRepository', () => {
    const mockSystemClock = SystemClock();
    const cacheRepository = new localStoreCacheRepository(mockSystemClock);
    const dayNotExpiredInMs = 1696681024;
    const dayInMs = 24 * 60 * 60 * 1000;

    const podcast: Podcast = {
        id: 1535809341,
        img: 'im:image',
        name: 'im:name',
        author: 'im:artist',
        description: 'description'
    }

    const podcastDTO = {
        storedAt: 1696681024,
        podcasts: [podcast]
    }

    const expiredPodcastDTO = {
        storedAt: 1696681024 - dayInMs,
        podcasts: [podcast]
    }

    const detailedPodcastDTO = {
        storedAt: 1696681024,
        podcasts: podcast
    }

    const expiredDetailedPodcastDTO = {
        storedAt: 1696681024 - dayInMs,
        podcasts: podcast
    }

    it('should retrieve from cache', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => JSON.stringify(podcastDTO))
        mockSystemClock.now = jest.fn(() => dayNotExpiredInMs);

        const result = await cacheRepository.get();

        expect(result).toEqual(podcastDTO.podcasts);
    } )

    it('should retrieve empty list when there are not entries in cache', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => null)

        const result = await cacheRepository.get();

        expect(result).toEqual([]);
    } )

    it('should retrieve empty list when there are an expired entry', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => JSON.stringify(expiredPodcastDTO))
        mockSystemClock.now = jest.fn(() => dayNotExpiredInMs);

        const result = await cacheRepository.get();

        expect(result).toEqual([]);
    } )

    it('should retrieve podcast by id from cache', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => JSON.stringify(detailedPodcastDTO))
        mockSystemClock.now = jest.fn(() => dayNotExpiredInMs);

        const result = await cacheRepository.getById(1535809341);

        expect(result).toEqual(podcast);
    } )

    it('should retrieve null when there are not entries in cache', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => null)

        const result = await cacheRepository.getById(1535809341);

        expect(result).toEqual(null);
    } )

    it('should retrieve null when there are an expired entry', async () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        mockGetItem.mockImplementation(() => JSON.stringify(expiredDetailedPodcastDTO))
        mockSystemClock.now = jest.fn(() => dayNotExpiredInMs);

        const result = await cacheRepository.getById(1535809341);

        expect(result).toEqual(null);
    } )

    it('should save a given podcast', function () {
        const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
        mockSystemClock.now = jest.fn(() => dayNotExpiredInMs);

        cacheRepository.save("podcast", [podcast])

        expect(mockSetItem).toHaveBeenCalledWith("podcast", JSON.stringify(podcastDTO))
    });
});