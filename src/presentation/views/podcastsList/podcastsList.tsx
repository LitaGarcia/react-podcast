import React, {useCallback, useEffect, useState} from "react";
import {Podcast} from "../../../domain/model/podcast";
import {HttpPodcastRepository} from "../../../infraestructure/repositories/http/httpPodcastRepository";
import {GetPodcastsTop} from "../../../application/getPodcastsTop";
import {SystemClock} from "../../../infraestructure/time/systemClock";
import Header from "../header/header";
import {TargetValueEvent} from "./targetValueEvent";
import PodcastItem from "../podcastItem/podcastItem";
import {localStoreCacheRepository} from "../../../infraestructure/repositories/localStore/localStoreCacheRepository";

export default function PodcastsList() {
    const [podcasts, setPodcasts] = useState<any>([]);
    const [searchName, setSearchName] = useState('');
    const getPodcastsTop = new GetPodcastsTop(new localStoreCacheRepository(SystemClock(), HttpPodcastRepository()));
    const searchByName = (ev: TargetValueEvent ) => setSearchName(ev.currentTarget.value);

    const getPodcasts = useCallback(async () => {
        {
            const response = await getPodcastsTop.execute()
            setPodcasts(response);
        }
    }, []);

    useEffect(() => {
        getPodcasts()
    }, []);

    const podcastList = podcasts
        .filter((podcast: any) =>
            podcast.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((podcast:Podcast, i: number) => {
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

