import {PodcastRepository} from "../../../domain/podcastRepository";
import {Entry, PodcastFeedResponse} from "./podcastFeedResponse";
import {PodcastLookUpResponse, Result} from "./podcastLookupResponse";
import {PodcastLookUp} from "../../../domain/podcastLookUp";

export const HttpPodcastRepository = (): PodcastRepository => ({
    getPodcast: async () => {
        const response = await fetch(
            'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
        );
        const podcastList: PodcastFeedResponse = await response.json();
        return podcastList.feed.entry.map((p: Entry ) => {
            return {
                id: p.id.attributes["im:id"],
                img: p['im:image'][2].label,
                name: p['im:name'].label,
                author: p['im:artist'].label,
                description: p.summary.label
            };
        });
    },
    getPodcastById: async (podcastId: number): Promise<PodcastLookUp> => {

        const response = await fetch(
            `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode&limit=25`
        );
        const podcastLookupResponse: PodcastLookUpResponse = await response.json();
        console.log(podcastLookupResponse)
        const podcastEpisodes = podcastLookupResponse.results.slice(1);
        return {
            id: podcastId,
            img: podcastLookupResponse.results[0].artworkUrl60,
            title: podcastLookupResponse.results[0].trackName,
            author: podcastLookupResponse.results[0].artistName,
            episodeNumbers: podcastLookupResponse.results[0].trackCount,
            episodes: podcastEpisodes.map((episode: Result) => {
                return {
                    id: episode.trackId,
                    title: episode.trackName,
                    releaseDate: episode.releaseDate,
                    trackTime: episode.trackTimeMillis
                }
            })
        }
    }
});