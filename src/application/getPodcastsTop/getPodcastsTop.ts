import {CacheRepository} from "../../domain/cacheRepository";
import {PodcastRepository} from "../../domain/podcastRepository";
import {Podcast} from "../../domain/model/podcast";

export class GetPodcastsTop {
    private _cachePodcastRepository: CacheRepository;
    private _podcastRepository: PodcastRepository;

    constructor(cachePodcastRepository: CacheRepository, podcastRepository: PodcastRepository) {
        this._cachePodcastRepository = cachePodcastRepository;
        this._podcastRepository = podcastRepository;
    }
    execute = async (): Promise<Podcast[]> => {
        const podcasts = await this._cachePodcastRepository.get()
        if (podcasts.length === 0) {
            const podcastList = await this._podcastRepository.getPodcast();
            this._cachePodcastRepository.save('podcast', podcastList);
            return podcastList
        }
        return podcasts
    }

}
