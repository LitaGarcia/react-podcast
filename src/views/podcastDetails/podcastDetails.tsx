import {useCallback, useEffect, useState} from "react";
import {execute} from "../../use-cases/getPodcastLookup";
import {HttpPodcastRepository} from "../../infraestructure/repositories/http/httpPodcastRepository";
import {SystemClock} from "../../infraestructure/time/systemClock";
import {PodcastLookUp} from "../../domain/podcastLookUp";
import {
    LocalStoreLookupRepository
} from "../../infraestructure/repositories/localStore/localStorePodcastLookupRepository";
import {useParams} from "react-router-dom";

function PodcastDetails() {
    const {podcastId} = useParams();
    const [podcast, setPodcast] = useState<PodcastLookUp>();
    const getPodcast = useCallback(async () => {
        const response = await execute(+podcastId!, HttpPodcastRepository(), LocalStoreLookupRepository(), SystemClock())
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