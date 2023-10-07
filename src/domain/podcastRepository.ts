import {Podcast} from "./model/podcast";

export interface PodcastRepository {
    getPodcast: () => Promise<Podcast[]>,
    getPodcastById: (id: number) => Promise<Podcast>
}