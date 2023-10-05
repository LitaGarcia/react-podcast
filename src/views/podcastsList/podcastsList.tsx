import React, {useCallback, useEffect, useState} from "react";
import {Podcast} from "../../domain/podcast";
import {HttpPodcastRepository} from "../../infraestructure/repositories/http/httpPodcastRepository";
import {execute} from "../../use-cases/getPodcastsTop";
import {LocalStorePodcastRepository} from "../../infraestructure/repositories/localStore/localStorePodcastRepository";
import {SystemClock} from "../../infraestructure/time/systemClock";
import Header from "../header/header";
import {TargetValueEvent} from "../../domain/targetValueEvent";
import PodcastItem from "../podcastItem/podcastItem";

export default function PodcastsList() {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);

    const [searchName, setSearchName] = useState('');
    const searchByName = (ev: TargetValueEvent ) => setSearchName(ev.currentTarget.value);

    const getPodcasts = useCallback(async () => {
        {
            const response = await execute(HttpPodcastRepository(), LocalStorePodcastRepository(), SystemClock())
            setPodcasts(response);
        }
    }, []);

    useEffect(() => {
        getPodcasts().then(resp => resp);
    }, []);



    const podcastList = podcasts
        .filter((podcast) =>
            podcast.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((podcast:Podcast, i) => {
    return (
        <PodcastItem podcast={podcast} key={i}/>
    );
    });

    return (
            <>
                <Header></Header>
                <main>
                    <form>
                        <input
                            type="text"
                            name="searchName"
                            id="searchName"
                            onChange={searchByName}
                            value={searchName}
                        ></input>
                    </form>
                    <ul>{podcastList}</ul>
                </main>
            </>
    );
}

