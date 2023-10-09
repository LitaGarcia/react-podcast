import {CacheRepository} from "../../domain/cacheRepository";
import {Podcast} from "../../domain/model/podcast";

export class GetDetailedPodcast {
    private _cachePodcastRepository: CacheRepository;
    constructor(cachePodcastRepository: CacheRepository) {
        this._cachePodcastRepository = cachePodcastRepository;
    }
    execute = async (id: number) => {
        const podcasts = await this._cachePodcastRepository.get();
        const podcast = podcasts.find((p: Podcast) => p.id === id);
        const podcastLookUp = await this._cachePodcastRepository.getById(id);
        if(!podcast) {
            console.log('The podcast has not been found')
        }

        return {
            id: podcast!.id,
            img: podcast!.img,
            name: podcast!.name,
            author: podcast!.author,
            description: podcast!.description,
            episodeNumbers: podcast!.episodeNumbers,
            episodes: podcastLookUp.episodes
        }
    }
}
