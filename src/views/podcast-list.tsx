import {useCallback, useEffect, useState} from "react";
import {Podcast} from "../domain/podcast";
import {HttpPodcastRepository} from "../infraestructure/repositories/httpPodcastRepository";
import {execute} from "../use-cases/getFavouritesTopPodcasts";

function PodcastList() {
    const [podcast, setPodcast] = useState<Podcast[]>([]);

    const getPodcasts = useCallback(async () => {
        try {
            const response = await execute(HttpPodcastRepository())
            setPodcast(response);
        }
        catch (exception) {
            console.error(exception);
        }
    }, []);

    useEffect(() => {
        getPodcasts().then(r => console.log(r));
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

export default PodcastList;