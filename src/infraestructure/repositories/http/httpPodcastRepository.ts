import {PodcastRepository} from "../../../domain/podcastRepository";
import {Entry} from "./podcastFeedResponse";

export const HttpPodcastRepository = (): PodcastRepository => ({
    getPodcast: async () => {
        const response = await fetch(
            'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        );
        const podcastList = await response.json();
        return podcastList.feed.entry.map((p: Entry ) => {
            return {
                id: p.id.attributes,
                img: p['im:image'][2].label,
                name: p['im:name'].label,
                author: p['im:artist'].label,
                description: p.summary.label
            };
        });
    }
});