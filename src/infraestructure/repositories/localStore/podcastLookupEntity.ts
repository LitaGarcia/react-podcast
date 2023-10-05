import {PodcastLookUp} from "../../../domain/podcastLookUp";

export interface PodcastLookupEntity {
    storedAt: number,
    podcastLookup: PodcastLookUp
}