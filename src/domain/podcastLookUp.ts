export interface PodcastLookUp {
    id: number,
    img: string,
    title: string,
    author: string,
    episodeNumbers: number,
    episodes: Episode[]
}

export interface Episode {
    id: number,
    title: string,
    releaseDate: string,
    trackTime: string

}