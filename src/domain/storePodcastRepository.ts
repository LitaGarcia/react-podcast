import {Podcast} from "./podcast";


export interface StorePodcastRepository {
    save: (podcasts: Podcast[], storedAt: number) => void;
    getPodcasts: () => Podcast[];
    getStoredDate: () => number;
}