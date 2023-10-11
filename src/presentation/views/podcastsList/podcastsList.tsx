import React, {useCallback, useEffect, useState} from "react";
import {Podcast} from "../../../domain/model/podcast";
import {HttpPodcastRepository} from "../../../infraestructure/repositories/http/httpPodcastRepository";
import {GetPodcastsTop} from "../../../application/getPodcastsTop/getPodcastsTop";
import {SystemClock} from "../../../infraestructure/time/systemClock";
import Header from "../header/header";
import {TargetValueEvent} from "./targetValueEvent";
import PodcastItem from "./podcastItem/podcastItem";
import {localStoreCacheRepository} from "../../../infraestructure/repositories/localStore/localStoreCacheRepository";
import {HttpClient} from "../../../infraestructure/repositories/http/httpClient";
import {GetFilteredPodcasts} from "../../../application/getFilteredPodcasts/getFilteredPodcasts";
import {NumberBox, Form, SectionList, Ul} from "./podcastsList.styles";

export default function PodcastsList() {
    const [podcasts, setPodcasts] = useState<any>([]);
    const [wordToSearch, setWordToSearch] = useState('');
    const httpPodcastRepository = new HttpPodcastRepository(new HttpClient());
    const storeCacheRepository = new localStoreCacheRepository(SystemClock());
    const getPodcastsTop = new GetPodcastsTop(storeCacheRepository, httpPodcastRepository);
    const getFilteredPodcasts = new GetFilteredPodcasts();
    const filterPodcasts = (ev: TargetValueEvent ) => setWordToSearch(ev.currentTarget.value);

    const getPodcasts = useCallback(async () => {
        {
            const response = await getPodcastsTop.execute()
            setPodcasts(response);
        }
    }, []);

    useEffect(() => {
        getPodcasts()
    }, []);

    const podcastList = getFilteredPodcasts.execute(podcasts, wordToSearch).map((podcast:Podcast) => {
    return (
        <PodcastItem podcast={podcast} key={podcast.id}/>
    );
    });

    return (
            <>
                <Header></Header>
                <main>
                <SectionList>
                    <Form>
                        <NumberBox>{podcastList.length}</NumberBox>
                        <input
                            type="text"
                            name="searchName"
                            id="searchName"
                            placeholder='Filter podcasts...'
                            onChange={filterPodcasts}
                            value={wordToSearch}
                        ></input>
                    </Form>
                    <Ul>{podcastList}</Ul>
                </SectionList>

                </main>
            </>
    );
}

