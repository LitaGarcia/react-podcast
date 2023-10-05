import {useCallback, useEffect, useState} from "react";

import {HttpPodcastRepository} from "../../infraestructure/repositories/http/httpPodcastRepository";
import {SystemClock} from "../../infraestructure/time/systemClock";
import {Episode, PodcastLookUp} from "../../domain/podcastLookUp";
import {
    LocalStoreLookupRepository
} from "../../infraestructure/repositories/localStore/localStorePodcastLookupRepository";
import {useNavigate, useParams} from "react-router-dom";
import {GetPodcastLoookupUseCase} from "../../use-cases/getPodcastLookup";
import PodcastEpisode from "../podcastEpisode/podcastEpisode";

function PodcastDetails() {
    const {podcastId} = useParams();
    const [podcast, setPodcast] = useState<PodcastLookUp>();
    const getPodcastLookupUseCase = new GetPodcastLoookupUseCase();
    const getPodcast = useCallback(async () => {
        const response = await getPodcastLookupUseCase.execute(+podcastId!, HttpPodcastRepository(), LocalStoreLookupRepository(), SystemClock())
        setPodcast(response);
    }, []);

    useEffect(() => {
        getPodcast().then(resp => resp);
    }, []);


    const episodeList = podcast?.episodes.map((episode: Episode, i: number) => {
        return (
                <PodcastEpisode episode={episode}  key={i}/>
        )
    })
    return (
        <>
        <p>
            {podcast?.title}
        </p>
        <ul>
            {episodeList}
        </ul>
            </>
    )

}
export default PodcastDetails