import {PodcastRepository} from "../../../domain/podcastRepository";
import {Entry, PodcastsResponse} from "./podcastsResponse";
import {DetailedPodcastResponse, Result} from "./detailedPodcastResponse";
import {Podcast} from "../../../domain/model/podcast";
import {HttpClient} from "./httpClient";

export class HttpPodcastRepository implements PodcastRepository {
    private _httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }
    getPodcast = async (): Promise<Podcast[]> => {
        const podcastList: PodcastsResponse = await this._httpClient.fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
        return podcastList.feed.entry.map((p: Entry ) => {
            return {
                id: Number.parseInt(p.id.attributes["im:id"]),
                img: p['im:image'][2].label,
                name: p['im:name'].label,
                author: p['im:artist'].label,
                description: p.summary.label
            }
        })
    }
    getPodcastById = async (id: number): Promise<Podcast> => {
        const podcastLookupResponse: DetailedPodcastResponse = await this._httpClient.fetch(`https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode&limit=25`);
        const podcastEpisodes = podcastLookupResponse.results.slice(1);
        return {
            id: id,
            img: podcastLookupResponse.results[0].artworkUrl60,
            name: podcastLookupResponse.results[0].trackName,
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
}