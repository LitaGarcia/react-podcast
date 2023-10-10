import {
    Author,
    Description,
    Container,
    Name
} from "./detailedPodcastCard.styles";


export function DetailedPodcastCard(podcast: any) {
     podcast = podcast.podcast;
    return (
        <Container>
            <img src={podcast?.img} alt={podcast?.name}>
            </img>
            <Name>
                {podcast?.name}
            </Name>
            <Author>
                by: {podcast?.author}
            </Author>
            <p>
                Description:
            </p>
            <Description>
                {podcast?.description}
            </Description>
        </Container>
    )
}
