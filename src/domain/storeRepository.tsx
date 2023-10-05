import {Podcast} from "./podcast";


export interface storeRepository {

    save: (podcasts: Podcast[], storedAt: number) => void;
    getPodcasts: () => Podcast[];
    getStoredDate: () => number;

}