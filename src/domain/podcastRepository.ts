import {Podcast} from "./podcast";
import {PodcastLookUp} from "./podcastLookUp";

export interface PodcastRepository {
    getPodcast: () => Promise<Podcast[]>,
    getPodcastById: (podcastId: number) => Promise<PodcastLookUp>
}