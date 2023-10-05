import {useCallback, useEffect, useState} from "react";
import {execute} from "../../use-cases/getPodcastLookup";
import {HttpPodcastRepository} from "../../infraestructure/repositories/http/httpPodcastRepository";
import {LocalStorePodcastRepository} from "../../infraestructure/repositories/localStore/localStorePodcastRepository";
import {SystemClock} from "../../infraestructure/time/systemClock";
import {PodcastLookUp} from "../../domain/podcastLookUp";
import {
    LocalStoreLookupRepository
} from "../../infraestructure/repositories/localStore/localStorePodcastLookupRepository";

function PodcastDetails() {
    const [podcast, setPodcast] = useState<PodcastLookUp>();
    const getPodcast = useCallback(async () => {
        {
            const response = await execute(1535809341, HttpPodcastRepository(), LocalStoreLookupRepository(), SystemClock())
            setPodcast(response);
        }
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