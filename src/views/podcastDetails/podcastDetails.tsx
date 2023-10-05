import {useCallback, useEffect, useState} from "react";

import {HttpPodcastRepository} from "../../infraestructure/repositories/http/httpPodcastRepository";
import {SystemClock} from "../../infraestructure/time/systemClock";
import {PodcastLookUp} from "../../domain/podcastLookUp";
import {
    LocalStoreLookupRepository
} from "../../infraestructure/repositories/localStore/localStorePodcastLookupRepository";
import {useParams} from "react-router-dom";
import {GetPodcastLoookupUseCase} from "../../use-cases/getPodcastLookup";

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

    return (
        <p>
            {podcast?.title}
    </p>
    )

}
export default PodcastDetails