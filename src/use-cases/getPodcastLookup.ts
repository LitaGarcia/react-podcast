import {Clock} from "../domain/clock";
import {StorePodcastLookupRepository} from "../domain/storePodcastLookupRepository";

export const execute = async (podcastLookupRepository: StorePodcastLookupRepository, localStoreRepository: StorePodcastLookupRepository, clock: Clock) => {
    const dayInMs = 24 * 60 * 60 * 1000;
    const currentDay = clock.now();
    const lastDayStored = localStoreRepository.getStoredDate();

    if (lastDayStored === 0 || currentDay - lastDayStored > dayInMs) {
        const podcastList = await podcastLookupRepository.getPodcastLookup();
        localStoreRepository.save(podcastList, currentDay)
        return podcastList
    } else {
        return localStoreRepository.getPodcastLookup()
    }

}
