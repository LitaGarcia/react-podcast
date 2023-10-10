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
    DetailsSection,
    Section, TitleSection, Table
} from "./podcastDetails.styles";
import {DetailedPodcastCard} from "../detailedPodcastCard/detailedPodcastCard";

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

    console.log(podcast)
    return (
        <>
            <Header></Header>
            <DetailsSection>
                <DetailedPodcastCard podcast={podcast}> </DetailedPodcastCard>
                <Section>
                    <TitleSection>
                        <p>Episodes: {podcast?.episodes?.length}</p>
                    </TitleSection>
                <Table>
                    <tbody>
                    {
                        podcast ? <PodcastDetailsEpisodes podcast={podcast} />  : null
                    }
                    </tbody>
                </Table>
                </Section>
                </DetailsSection>

            </>
    )

}