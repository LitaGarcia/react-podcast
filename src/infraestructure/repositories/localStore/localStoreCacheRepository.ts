import {Clock} from "../../../domain/clock";
import {Podcast} from "../../../domain/model/podcast";
import {PodcastDTO} from "./podcastDTO";
import {CacheRepository} from "../../../domain/cacheRepository";

export class localStoreCacheRepository implements CacheRepository {
    private _clock: Clock;

    constructor (clock: Clock) {
        this._clock = clock;
    }

    async get(): Promise<Podcast[]> {
        const storedData = localStorage.getItem('podcast');
        console.log(storedData)
        if (storedData === null || this.isStoredMoreThanOneDay(storedData!)) {
            return []
        }
        return JSON.parse(storedData!).podcasts
    }

    async getById(id: number): Promise<Podcast | null> {
        const storedData = localStorage.getItem(`detailedPodcast-${id}`);
        if (storedData === null || this.isStoredMoreThanOneDay(storedData!)) {
            return null
        }
        return JSON.parse(storedData!).podcasts
    }

    save(key: string, dataToStore: any): void {
        const currentDay = this._clock.now();

        const podcastToSave: PodcastDTO = {
            storedAt: currentDay,
            podcasts: dataToStore
        }
        localStorage.setItem(key, JSON.stringify(podcastToSave));
    }

    private isStoredMoreThanOneDay(storedData: string) {
        const dayInMs = 24 * 60 * 60 * 1000;
        const storedDataParsed = JSON.parse(storedData!);
        const currentDay = this._clock.now();
        const lastDayStored = storedDataParsed.storedAt;
        return  currentDay - lastDayStored >= dayInMs
    }

}