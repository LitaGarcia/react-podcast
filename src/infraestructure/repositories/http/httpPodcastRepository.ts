import {PodcastRepository} from "../../../domain/podcastRepository";
import {Entry, PodcastsResponse} from "./podcastsResponse";
import {DetailedPodcastResponse, Result} from "./detailedPodcastResponse";
import {Podcast} from "../../../domain/model/podcast";
import {HttpClient} from "./httpClient";
import { format, parseISO } from 'date-fns';

export class HttpPodcastRepository implements PodcastRepository {
    private _httpClient: HttpClient;
    constructor(httpClient: HttpClient) {
        this._httpClient = httpClient;
    }
    getPodcast = async (): Promise<Podcast[]> => {
        const podcastList: PodcastsResponse = await this._httpClient.fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`);
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
        const URL = "https://itunes.apple.com/lookup?id=";
        const queryParams = "&entity=podcastEpisode&limit=25";
        const proxiedUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
            `${URL}${id}${queryParams}`
        )}`;

        const detailedPodcast = await this._httpClient.fetch(proxiedUrl);
        const podcastEpisodes = detailedPodcast.results.slice(1);
        console.log(detailedPodcast);
        console.log(podcastEpisodes);
        return {
            id: id,
            img: detailedPodcast.results[0].artworkUrl60,
            name: detailedPodcast.results[0].trackName,
            author: detailedPodcast.results[0].artistName,
            episodeNumbers: detailedPodcast.results[0].trackCount,
            episodes: podcastEpisodes.map((episode: Result) => {
                return {
                    id: episode.trackId,
                    title: episode.trackName,
                    releaseDate: this.formatDate(episode.releaseDate),
                    trackTime: this.formatMillisecondsToMMSS(Number.parseInt(episode.trackTimeMillis)),
                    description: episode.description,
                    url: episode.episodeUrl
                    }
                })
            }

    }

    private formatMillisecondsToMMSS(milliseconds: number): string {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    private formatDate(dateToFormat: string): string {
        return format(parseISO(dateToFormat), 'dd/MM/yyyy');
    }
}