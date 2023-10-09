import {CacheRepository} from "../domain/cacheRepository";
import {Podcast} from "../domain/model/podcast";
import {Episode} from "../domain/model/episode";

export class GetDetailedEpisode {
    private _cachePodcastRepository: CacheRepository;
    constructor(cachePodcastRepository: CacheRepository) {
        this._cachePodcastRepository = cachePodcastRepository;
    }
    execute = async (podcastId: number, episodeId:number): Promise<Podcast> => {
        const podcasts = await this._cachePodcastRepository.get();
        const podcast = podcasts.find((p: Podcast) => p.id === podcastId);
        const podcastLookUp = await this._cachePodcastRepository.getById(podcastId);
        const selectedEpisode = podcastLookUp?.episodes?.find((episode: Episode) => episode.id === episodeId);

        if (!podcast) {
            console.log('The podcast has not been found')
        }
        if (!selectedEpisode) {
            console.log('The episode has not been found')
        }

        return {
            id: podcast!.id,
            img: podcast!.img,
            name: podcast!.name,
            author: podcast!.author,
            description: podcast!.description,
            episodeNumbers: podcast!.episodeNumbers,
            episodes: [{
                id: selectedEpisode!.id,
                title: selectedEpisode!.title,
                releaseDate: selectedEpisode!.releaseDate,
                trackTime: selectedEpisode!.trackTime,
                description: selectedEpisode!.description,
                url: selectedEpisode!.url
            }]
        }
    }
}
