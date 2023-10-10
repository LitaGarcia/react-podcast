import {CacheRepository} from "../../domain/cacheRepository";
import {Podcast} from "../../domain/model/podcast";
import {PodcastRepository} from "../../domain/podcastRepository";

export class GetDetailedPodcast {
    private _cachePodcastRepository: CacheRepository;
    private _podcastRepository: PodcastRepository;
    constructor(cachePodcastRepository: CacheRepository, podcastRepository: PodcastRepository) {
        this._cachePodcastRepository = cachePodcastRepository;
        this._podcastRepository = podcastRepository;
    }
    execute = async (id: number): Promise<Podcast>  => {
        let podcasts = await this._cachePodcastRepository.get()
        if (podcasts.length === 0) {
            podcasts = await this._podcastRepository.getPodcast();
            this._cachePodcastRepository.save('podcast', podcasts);
        }
        const podcast = podcasts.find((p: Podcast) => p.id === id);
        if(!podcast) {
            console.log('The podcast has not been found')
        }
        let detailedPodcast = await this._cachePodcastRepository.getById(id);
        if(!detailedPodcast){
            detailedPodcast = await this._podcastRepository.getPodcastById(id);
            this._cachePodcastRepository.save(`detailedPodcast-${id}`, detailedPodcast);
        }
        return {
            id: podcast!.id,
            img: podcast!.img,
            name: podcast!.name,
            author: podcast!.author,
            description: podcast!.description,
            episodeNumbers: podcast!.episodeNumbers,
            episodes: detailedPodcast.episodes
        }
    }
}
