import {HttpClient} from "../../../infraestructure/repositories/http/httpClient";
import {HttpPodcastRepository} from "../../../infraestructure/repositories/http/httpPodcastRepository";
import {SystemClock} from "../../../infraestructure/time/systemClock";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Podcast} from "../../../domain/model/podcast";
import {GetDetailedPodcast} from "../../../application/getDetailedPodcast";
import {localStoreCacheRepository} from "../../../infraestructure/repositories/localStore/localStoreCacheRepository";
import {Episode} from "../../../domain/model/episode";


export default function EpisodeDetails( ){
    const httpClient = new HttpClient()
    const httpPodcastRepository = new HttpPodcastRepository(httpClient);
    const systemClock = SystemClock();
    const {podcastId} = useParams();
    const [podcast, setPodcast] = useState<Podcast>();
    const getPodcastLookup= new GetDetailedPodcast(new localStoreCacheRepository(systemClock, httpPodcastRepository));

    const getPodcast = useCallback(async () => {
        const response = await getPodcastLookup.execute(+podcastId!)
        console.log(response)
        setPodcast(response);

    }, []);


    useEffect(() => {
        getPodcast();
    }, []);


    const episodeList = podcast?.episodes?.map((episode: Episode, i: number) => {
        console.log(podcast)
        return (
            <>
                <li>
                    <audio  controls>
                        <source src={episode.url} type="audio/mpeg" />
                    </audio>
                </li>
            </>
        )
    })

return(
    <>
        <ul>{episodeList}</ul>
    </>
)
}