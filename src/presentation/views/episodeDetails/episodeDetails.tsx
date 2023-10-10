import {HttpClient} from "../../../infraestructure/repositories/http/httpClient";
import {HttpPodcastRepository} from "../../../infraestructure/repositories/http/httpPodcastRepository";
import {SystemClock} from "../../../infraestructure/time/systemClock";
import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Podcast} from "../../../domain/model/podcast";
import {localStoreCacheRepository} from "../../../infraestructure/repositories/localStore/localStoreCacheRepository";
import {Episode} from "../../../domain/model/episode";
import {GetDetailedEpisode} from "../../../application/getDetailedEpisode/getDetailedEpisode";
import {DetailedPodcastCard} from "../detailedPodcastCard/detailedPodcastCard";
import {Audio, Container, Description, Section, Title} from "./episodeDetails.styles";
import Header from "../header/header";


export default function EpisodeDetails( ){
    const httpClient = new HttpClient()
    const httpPodcastRepository = new HttpPodcastRepository(httpClient);
    const systemClock = SystemClock();
    const {episodeId, podcastId} = useParams();
    const [podcast, setPodcast] = useState<Podcast>();
    const getDetailedEpisodes= new GetDetailedEpisode(new localStoreCacheRepository(systemClock, httpPodcastRepository));

    const getPodcast = useCallback(async () => {
        const response = await getDetailedEpisodes.execute(+podcastId! ,+episodeId!)
        console.log(response)
        setPodcast(response);

    }, []);


    useEffect(() => {
        getPodcast();
    }, []);


    const episodeList = podcast?.episodes?.map((episode: Episode, i: number) => {
        console.log(podcast)
        return (
            <>
                <Header></Header>
                <Section>
                    <DetailedPodcastCard podcast={podcast}>
                    </DetailedPodcastCard>

                    <Container>
                        <Title>{episode.title}</Title>
                        <Description>{episode.description}</Description>
                        <Audio  controls>
                            <source src={episode.url} type="audio/mpeg" />
                        </Audio>
                    </Container>

                </Section>
            </>
        )
    })

return(
    <>
        <ul>{episodeList}</ul>
    </>
)
}