import {useCallback, useEffect, useState} from "react";

import {SystemClock} from "../../../infraestructure/time/systemClock";
import {useParams} from "react-router-dom";
import {GetDetailedPodcast} from "../../../application/getDetailedPodcast/getDetailedPodcast";
import PodcastDetailsEpisodes from "./podcastDetailsEpisodes/podcastDetailsEpisodes";
import {localStoreCacheRepository} from "../../../infraestructure/repositories/localStore/localStoreCacheRepository";
import {Podcast} from "../../../domain/model/podcast";
import {HttpPodcastRepository} from "../../../infraestructure/repositories/http/httpPodcastRepository";
import {HttpClient} from "../../../infraestructure/repositories/http/httpClient";
import Header from "../header/header";
import {
    PodcastContainer,
    PodcastDetailedAuthor, PodcastDetailedDesc, PodcastDetailedEpisodesSection, PodcastDetailedEpisodesTitleContainer,
    PodcastDetailedItem,
    PodcastDetailedName
} from "./podcastDetails.styles";

export default function PodcastDetails() {
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
            <Header></Header>
            <PodcastContainer>
                <PodcastDetailedItem>
                    <img src={podcast?.img} alt={podcast?.name}>
                    </img>
                    <PodcastDetailedName>
                        {podcast?.name}
                    </PodcastDetailedName>
                    <PodcastDetailedAuthor>
                        by: {podcast?.author}
                    </PodcastDetailedAuthor>
                    <p>
                    Description:
                    </p>
                    <PodcastDetailedDesc>
                        {podcast?.description}
                    </PodcastDetailedDesc>
            </PodcastDetailedItem>

                <PodcastDetailedEpisodesSection>
                    <PodcastDetailedEpisodesTitleContainer>
                        <p>Episodes: {podcast?.episodes?.length}</p>
                    </PodcastDetailedEpisodesTitleContainer>
                <ul>
                    {
                        podcast ? <PodcastDetailsEpisodes podcast={podcast} />  : null
                    }
                </ul>
                </PodcastDetailedEpisodesSection>
                </PodcastContainer>

            </>
    )

}