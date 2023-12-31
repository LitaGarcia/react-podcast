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
    const [isLoading, setIsLoading] = useState(true);
    const storeCacheRepository = new localStoreCacheRepository(systemClock);
    const getDetailedEpisodes= new GetDetailedEpisode(storeCacheRepository, httpPodcastRepository);

    const getPodcast = useCallback(async () => {
        const response = await getDetailedEpisodes.execute(+podcastId! ,+episodeId!)
        setPodcast(response);
        setIsLoading(false)
    }, []);


    useEffect(() => {
        setIsLoading(true)
        getPodcast();
    }, []);


    const episodeList = podcast?.episodes?.map((episode: Episode, i: number) => {
        return (
            <>
                <Header isLoading={isLoading}></Header>
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