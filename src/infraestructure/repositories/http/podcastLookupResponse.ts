export interface PodcastLookUpResponse {
    resultCount: number;
    results:     Result[];
}

export interface Result {
    trackTimeMillis: string;
    releaseDate: string;
    trackId: number;
    trackCount: number;
    artistName: string;
    trackName: string;
    artworkUrl60: string;

}