import {Podcast} from "../../domain/model/podcast";

export class GetFilteredPodcasts {
    execute = (podcasts: Podcast[], wordToSearch: string): Podcast[] => {
        console.log(wordToSearch)
        return  podcasts.filter((podcast: any) =>
            podcast.name.toLowerCase().includes(wordToSearch.toLowerCase())
                ||
                podcast.author.toLowerCase().includes(wordToSearch.toLowerCase())
        )
    }
}