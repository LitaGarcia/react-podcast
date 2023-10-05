import {PodcastRepository} from "../domain/podcastRepository";
import {storeRepository} from "../domain/storeRepository";
import {Clock} from "../domain/clock";
import {Podcast} from "../domain/podcast";

export const execute = async (podcastRepository: PodcastRepository, localStoreRepository: storeRepository, clock: Clock) => {
    const dayInMs = 24 * 60 * 60 * 1000;
    const currentDay = clock.now();
    const lastDayStored = localStoreRepository.getLocalStorage('storedAt');


    if (!lastDayStored || currentDay - lastDayStored > dayInMs) {
        const podcastList = await podcastRepository.getPodcast();
        localStoreRepository.saveLocalStorage('podcastList',  JSON.stringify(podcastList))
        localStoreRepository.saveLocalStorage('storedAt', currentDay);
        return podcastList
    } else {
        console.log('no ha pasado más de un día')
        const podcastList: Podcast[] = JSON.parse(localStoreRepository.getLocalStorage('podcastList'))
        console.log(podcastList)
        return podcastList
    }


}

