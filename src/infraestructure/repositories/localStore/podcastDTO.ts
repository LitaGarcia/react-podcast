import {Podcast} from "../../../domain/model/podcast";

export interface PodcastDTO {
    storedAt: number,
    podcasts: Podcast[]
}