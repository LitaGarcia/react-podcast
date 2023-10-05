import {PodcastRepository} from "../domain/podcastRepository";
import {storeRepository} from "../domain/storeRepository";
import {Clock} from "../domain/clock";

export const execute = async (podcastRepository: PodcastRepository, localStoreRepository: storeRepository, clock: Clock) => {
    const dayInMs = 24 * 60 * 60 * 1000;
    const currentDay = clock.now();
    const lastDayStored = localStoreRepository.getStoredDate();


    if (lastDayStored === 0 || currentDay - lastDayStored > dayInMs) {
        const podcastList = await podcastRepository.getPodcast();
        localStoreRepository.save(podcastList, currentDay)
        return podcastList
    } else {
        return localStoreRepository.getPodcasts()
    }


}

