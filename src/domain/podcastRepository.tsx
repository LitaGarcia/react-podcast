import {Podcast} from "./podcast";

export interface PodcastRepository {
    getPodcast: () => Promise<Podcast[]>;
}