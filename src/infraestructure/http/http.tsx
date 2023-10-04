import {PodcastFeedResponse} from "../repositories/podcastFeedResponse";

export interface Http {
    get: (path: string, params?: Record<string, any>, config?: any) => Promise<PodcastFeedResponse>;
}