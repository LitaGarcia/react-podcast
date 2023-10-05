import {Podcast} from "../../../domain/podcast";

export interface PodcastEntity {
    storedAt: number,
    podcasts: Podcast[]
}