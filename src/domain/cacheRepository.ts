import {Podcast} from "./model/podcast";

export interface CacheRepository {
    get: () => Promise<Podcast[]>;
    getById: (id: number) => Promise<Podcast>;

}