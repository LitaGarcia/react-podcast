import {Clock} from "../domain/clock";
import {StorePodcastLookupRepository} from "../domain/storePodcastLookupRepository";
import {PodcastRepository} from "../domain/podcastRepository";

export const execute = async (id: number, podcastLookupRepository: PodcastRepository, localStoreRepository: StorePodcastLookupRepository, clock: Clock) => {
    const dayInMs = 24 * 60 * 60 * 1000;
    const currentDay = clock.now();
    const lastDayStored = localStoreRepository.getStoredDate(id);

    if (lastDayStored === 0 || currentDay - lastDayStored > dayInMs) {
        const podcast = await podcastLookupRepository.getPodcastById(id);
        localStoreRepository.save(podcast, currentDay)
        return podcast
    } else {
        return localStoreRepository.getPodcastLookup(id)
    }

}
