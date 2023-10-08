import {useCallback, useEffect, useState} from "react";

import {SystemClock} from "../../../infraestructure/time/systemClock";
import {useParams} from "react-router-dom";
import {GetDetailedPodcast} from "../../../application/getDetailedPodcast";
import PodcastEpisode from "../podcastEpisode/podcastEpisode";
import {localStoreCacheRepository} from "../../../infraestructure/repositories/localStore/localStoreCacheRepository";
import {Podcast} from "../../../domain/model/podcast";
import {HttpPodcastRepository} from "../../../infraestructure/repositories/http/httpPodcastRepository";
import {HttpClient} from "../../../infraestructure/repositories/http/httpClient";

function PodcastDetails() {
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

    return (
        <>
        <p>
        </p>
        <ul>
            <PodcastEpisode episodes={podcast?.episodes} id={podcast?.id}/>
        </ul>
            </>
    )

}
export default PodcastDetails