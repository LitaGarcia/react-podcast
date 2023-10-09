import {Clock} from "../../../domain/clock";
import {PodcastRepository} from "../../../domain/podcastRepository";
import {Podcast} from "../../../domain/model/podcast";
import {PodcastDTO} from "./podcastDTO";
import {CacheRepository} from "../../../domain/cacheRepository";

export class localStoreCacheRepository implements CacheRepository {
    private _podcastRepository: PodcastRepository;
    private _clock: Clock;
    constructor (clock: Clock, podcastRepository: PodcastRepository) {
        this._clock = clock;
        this._podcastRepository = podcastRepository;
    }
    async get(): Promise<Podcast[]> {
        const storedData = localStorage.getItem('podcast');

        if (!storedData || this.isStoredMoreThanOneDay(storedData)) {
            const podcastList = await this._podcastRepository.getPodcast();
            this.save('podcast', podcastList);
            return podcastList
        }
        return JSON.parse(storedData!).podcasts
    }

    async getById(id: number): Promise<Podcast> {
        const storedData = localStorage.getItem(`podcastLookup-${id}`);

        if (!storedData || this.isStoredMoreThanOneDay(storedData!)) {
            const podcastLookup = await this._podcastRepository.getPodcastById(id);
            this.save(`podcastLookup-${id}`, [podcastLookup]);
            return podcastLookup
        }
        return JSON.parse(storedData!).podcasts
    }

    private save(key: string, dataToStore: any): any {
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