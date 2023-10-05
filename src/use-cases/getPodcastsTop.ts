import {PodcastRepository} from "../domain/podcastRepository";
import {StorePodcastRepository} from "../domain/storePodcastRepository";
import {Clock} from "../domain/clock";

export class GetPodcastsTop {
    execute = async (podcastRepository: PodcastRepository, localStoreRepository: StorePodcastRepository, clock: Clock) => {
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

}
