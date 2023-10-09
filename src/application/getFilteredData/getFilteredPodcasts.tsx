import {Podcast} from "../../domain/model/podcast";

export class GetFilteredPodcasts {
    execute = (podcasts: Podcast[], nameToSearch: string): Podcast[] => {
        return  podcasts.filter((podcast: any) =>
            podcast.name.toLowerCase().includes(nameToSearch.toLowerCase())
        )
    }
}