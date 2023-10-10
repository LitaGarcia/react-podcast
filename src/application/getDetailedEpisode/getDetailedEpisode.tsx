import {CacheRepository} from "../../domain/cacheRepository";
import {Podcast} from "../../domain/model/podcast";
import {Episode} from "../../domain/model/episode";
import {PodcastRepository} from "../../domain/podcastRepository";

export class GetDetailedEpisode {
    private _cachePodcastRepository: CacheRepository;
    private _podcastRepository: PodcastRepository;
    constructor(cachePodcastRepository: CacheRepository, podcastRepository: PodcastRepository) {
        this._cachePodcastRepository = cachePodcastRepository;
        this._podcastRepository = podcastRepository;
    }
    execute = async (podcastId: number, episodeId:number): Promise<Podcast> => {
        let podcasts = await this._cachePodcastRepository.get()
        if (podcasts.length === 0) {
            podcasts = await this._podcastRepository.getPodcast();
            this._cachePodcastRepository.save('podcast', podcasts);
        }
        const podcast = podcasts.find((p: Podcast) => p.id === podcastId);
        if(!podcast) {
            console.log('The podcast has not been found')
        }
        let detailedPodcast = await this._cachePodcastRepository.getById(podcastId);
        if(!detailedPodcast){
            detailedPodcast = await this._podcastRepository.getPodcastById(podcastId);
            this._cachePodcastRepository.save(`detailedPodcast-${podcastId}`, detailedPodcast);
        }

        const selectedEpisode = detailedPodcast?.episodes?.find((episode: Episode) => episode.id === episodeId);

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
