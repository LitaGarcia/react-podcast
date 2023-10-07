import {Episode} from "./episode";

export interface Podcast {
    id: number,
    img: string,
    name: string,
    author: string,
    description?: string,
    episodeNumbers?: number,
    episodes?: Episode[]
}