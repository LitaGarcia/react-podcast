
import {PodcastLookUp} from "./podcastLookUp";


export interface StorePodcastLookupRepository {
    save: (podcastLookup: PodcastLookUp, storedAt: number) => void;
    getPodcastLookup: () => PodcastLookUp;
    getStoredDate: () => number;
}