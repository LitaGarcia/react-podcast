import {CacheRepository} from "../domain/cacheRepository";

export class GetPodcastsTop {
    private _cachePodcastRepository: CacheRepository;

    constructor(cachePodcastRepository: CacheRepository) {
        this._cachePodcastRepository = cachePodcastRepository;
    }
    execute = async () => {
        return this._cachePodcastRepository.get()
    }

}
