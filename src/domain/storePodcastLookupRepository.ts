
import {PodcastLookUp} from "./podcastLookUp";


export interface StorePodcastLookupRepository {
    save: (podcastLookup: PodcastLookUp, storedAt: number) => void;
    getPodcastLookup: (id: number) => PodcastLookUp;
    getStoredDate: (id: number) => number;
}