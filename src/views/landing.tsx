import {useCallback, useEffect, useState} from "react";
import {Podcast} from "../domain/podcast";
import {HttpPodcastRepository} from "../infraestructure/repositories/http/httpPodcastRepository";
import {execute} from "../use-cases/getFavouritesTopPodcasts";
import {LocalStoreRepository} from "../infraestructure/repositories/localStore/localStoreRepository";
import {SystemClock} from "../infraestructure/time/systemClock";

function Landing() {
    const [podcast, setPodcast] = useState<Podcast[]>([]);

    const getPodcasts = useCallback(async () => {
        {
            const response = await execute(HttpPodcastRepository(), LocalStoreRepository(), SystemClock())
            setPodcast(response);
        }
    }, []);

    useEffect(() => {
        getPodcasts().then(resp => resp);
    }, []);

    const html = podcast.map((podcast1:Podcast) => {
    return (
        <li>
            <p>{podcast1.name}</p>
        </li>
    );
});
    return (
            < >
            <ul>{html}</ul>
            </>
    );
}

export default Landing;